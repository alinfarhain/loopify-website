import duitNowQr from "../assets/images/payment/duitnow-qr.jpeg";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useCart } from "../context/CartContext.jsx";
import { formatCurrency } from "../utils/formatCurrency.js";

const checkoutSteps = [
  {
    number: 1,
    name: "Details",
  },
  {
    number: 2,
    name: "Pickup",
  },
  {
    number: 3,
    name: "Payment",
  },
  {
    number: 4,
    name: "Review",
  },
];

const MAX_RECEIPT_SIZE = 5 * 1024 * 1024;

const allowedReceiptTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];

const allowedReceiptExtensions = [
  "jpg",
  "jpeg",
  "png",
  "pdf",
];

function getLocalDateString() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(
    2,
    "0",
  );
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function FieldError({ message }) {
  if (!message) {
    return null;
  }

  return (
    <span className="field-error" role="alert">
      {message}
    </span>
  );
}

function getPaymentMethodLabel(paymentMethod) {
  if (paymentMethod === "duitnow") {
    return "DuitNow QR";
  }

  if (paymentMethod === "cash") {
    return "Cash at Pickup";
  }

  return "Not selected";
}

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    totalBoxes,
    clearCart,
  } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [receiptFile, setReceiptFile] =
    useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    matricNumber: "",
    notes: "",

    pickupDate: "",
    pickupTime: "",

    paymentMethod: "",
    agreeTerms: false,
  });

  function updateField(event) {
    const {
      name,
      type,
      checked,
      value,
    } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (
      name === "paymentMethod" &&
      value === "cash"
    ) {
      setReceiptFile(null);
    }

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }

    if (
      name === "paymentMethod" &&
      errors.receipt
    ) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        receipt: "",
      }));
    }
  }

  function handleReceiptUpload(event) {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      setReceiptFile(null);
      return;
    }

    const fileExtension = selectedFile.name
      .split(".")
      .pop()
      ?.toLowerCase();

    const validFileType =
      allowedReceiptTypes.includes(
        selectedFile.type,
      ) ||
      allowedReceiptExtensions.includes(
        fileExtension,
      );

    if (!validFileType) {
      setReceiptFile(null);

      setErrors((currentErrors) => ({
        ...currentErrors,
        receipt:
          "Upload a JPG, JPEG, PNG, or PDF receipt.",
      }));

      event.target.value = "";
      return;
    }

    if (
      selectedFile.size >
      MAX_RECEIPT_SIZE
    ) {
      setReceiptFile(null);

      setErrors((currentErrors) => ({
        ...currentErrors,
        receipt:
          "The receipt must be 5 MB or smaller.",
      }));

      event.target.value = "";
      return;
    }

    setReceiptFile(selectedFile);

    setErrors((currentErrors) => ({
      ...currentErrors,
      receipt: "",
    }));
  }

  function removeReceipt() {
    setReceiptFile(null);

    const input =
      document.getElementById(
        "payment-receipt",
      );

    if (input) {
      input.value = "";
    }
  }

  function validateStep(step) {
    const nextErrors = {};

    if (step === 1) {
      if (form.fullName.trim().length < 2) {
        nextErrors.fullName =
          "Enter your full name.";
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          form.email.trim(),
        )
      ) {
        nextErrors.email =
          "Enter a valid email address.";
      }

      if (
        !/^[0-9+\-\s]{8,15}$/.test(
          form.phone.trim(),
        )
      ) {
        nextErrors.phone =
          "Enter a valid phone number.";
      }
    }

    if (step === 2) {
      if (!form.pickupDate) {
        nextErrors.pickupDate =
          "Choose a pickup date.";
      }

      if (!form.pickupTime) {
        nextErrors.pickupTime =
          "Choose a pickup time.";
      }
    }

    if (step === 3) {
      if (!form.paymentMethod) {
        nextErrors.paymentMethod =
          "Select a payment method.";
      }

      if (
        form.paymentMethod === "duitnow" &&
        !receiptFile
      ) {
        nextErrors.receipt =
          "Upload your payment receipt after completing the DuitNow payment.";
      }
    }

    if (
      step === 4 &&
      !form.agreeTerms
    ) {
      nextErrors.agreeTerms =
        "You must accept the terms before placing the order.";
    }

    return nextErrors;
  }

  function moveToNextStep() {
    const nextErrors =
      validateStep(currentStep);

    if (
      Object.keys(nextErrors).length > 0
    ) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});

    setCurrentStep((step) =>
      Math.min(4, step + 1),
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function moveToPreviousStep() {
    setErrors({});

    setCurrentStep((step) =>
      Math.max(1, step - 1),
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function placeOrder() {
    const allErrors = {
      ...validateStep(1),
      ...validateStep(2),
      ...validateStep(3),
      ...validateStep(4),
    };

    if (
      Object.keys(allErrors).length > 0
    ) {
      setErrors(allErrors);

      const detailFields = [
        "fullName",
        "email",
        "phone",
      ];

      const pickupFields = [
        "pickupDate",
        "pickupTime",
      ];

      if (
        detailFields.some(
          (field) => allErrors[field],
        )
      ) {
        setCurrentStep(1);
      } else if (
        pickupFields.some(
          (field) => allErrors[field],
        )
      ) {
        setCurrentStep(2);
      } else if (
        allErrors.paymentMethod ||
        allErrors.receipt
      ) {
        setCurrentStep(3);
      } else {
        setCurrentStep(4);
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setIsSubmitting(true);

    const order = {
      orderNumber: `LPF-${Date.now()
        .toString()
        .slice(-8)}`,

      createdAt: new Date().toISOString(),

      status:
        form.paymentMethod === "duitnow"
          ? "Payment proof submitted"
          : "Order confirmed — payment due at pickup",

      items: cartItems,
      totalBoxes,
      subtotal,

      customer: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        matricNumber:
          form.matricNumber,
        notes: form.notes,
      },

      fulfilment: {
        method: "pickup",
        location:
          "EDU Café, near the Kulliyyah of Engineering and Education buildings",
        pickupDate: form.pickupDate,
        pickupTime: form.pickupTime,
      },

      paymentMethod:
        form.paymentMethod,

      paymentStatus:
        form.paymentMethod === "duitnow"
          ? "Receipt uploaded for verification"
          : "Payment due at pickup",

      receiptProof: receiptFile
        ? {
            name: receiptFile.name,
            type: receiptFile.type,
            size: receiptFile.size,
          }
        : null,
    };

    try {
      localStorage.setItem(
        "loopify-last-order",
        JSON.stringify(order),
      );

      clearCart();

      navigate("/order-confirmation");
    } catch (error) {
      console.error(
        "Unable to create the order:",
        error,
      );

      setErrors({
        submit:
          "The order could not be saved. Please try again.",
      });

      setIsSubmitting(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <section className="empty-cart-page page-section">
        <div
          className="empty-cart-symbol"
          aria-hidden="true"
        >
          !
        </div>

        <p className="eyebrow">
          CHECKOUT_UNAVAILABLE
        </p>

        <h1>Your checkout is empty</h1>

        <p>
          Add at least one Loopify mystery
          box before beginning checkout.
        </p>

        <Link
          className="button button-primary"
          to="/shop"
        >
          Go to Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-page page-section">
      <div className="checkout-heading">
        <p className="eyebrow">
          SECURE_CHECKOUT.EXE
        </p>

        <h1>Complete Your Order</h1>

        <p>
          All Loopify orders are collected
          through campus pickup. Complete each
          step below to reserve your mystery
          boxes.
        </p>
      </div>

      <ol
        className="checkout-stepper"
        aria-label="Checkout progress"
      >
        {checkoutSteps.map((step) => (
          <li
            key={step.number}
            className={[
              currentStep === step.number
                ? "is-current"
                : "",
              currentStep > step.number
                ? "is-complete"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span>{step.number}</span>
            <strong>{step.name}</strong>
          </li>
        ))}
      </ol>

      <div className="checkout-layout">
        <div className="checkout-form-panel">
          {currentStep === 1 && (
            <section aria-labelledby="details-heading">
              <p className="eyebrow">
                STEP_01
              </p>

              <h2 id="details-heading">
                Customer Details
              </h2>

              <div className="form-grid">
                <div className="form-field form-field-full">
                  <label htmlFor="fullName">
                    Full name *
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={form.fullName}
                    aria-invalid={Boolean(
                      errors.fullName,
                    )}
                    onChange={updateField}
                  />

                  <FieldError
                    message={
                      errors.fullName
                    }
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">
                    Email address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    aria-invalid={Boolean(
                      errors.email,
                    )}
                    onChange={updateField}
                  />

                  <FieldError
                    message={errors.email}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="phone">
                    Phone number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    placeholder="+60 12 345 6789"
                    aria-invalid={Boolean(
                      errors.phone,
                    )}
                    onChange={updateField}
                  />

                  <FieldError
                    message={errors.phone}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="matricNumber">
                    IIUM matric number
                  </label>

                  <input
                    id="matricNumber"
                    name="matricNumber"
                    type="text"
                    value={
                      form.matricNumber
                    }
                    onChange={updateField}
                  />

                  <small>
                    Optional. This can help
                    identify your campus pickup.
                  </small>
                </div>

                <div className="form-field form-field-full">
                  <label htmlFor="notes">
                    Order notes
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows="4"
                    value={form.notes}
                    placeholder="Add an optional message for the Loopify team."
                    onChange={updateField}
                  />

                  <small>
                    Do not include passwords or
                    banking information.
                  </small>
                </div>
              </div>
            </section>
          )}

          {currentStep === 2 && (
            <section aria-labelledby="pickup-heading">
              <p className="eyebrow">
                STEP_02
              </p>

              <h2 id="pickup-heading">
                Campus Pickup
              </h2>

              <div className="pickup-only-card">
                <div
                  className="pickup-only-icon"
                  aria-hidden="true"
                >
                </div>

                <div>
                  <h3>EDU Café Pickup Point</h3>

                  <p>
                    All orders must be collected
                    at EDU Café, near the
                    Kulliyyah of Engineering and
                    Education buildings.
                  </p>

                  <strong>
                    No delivery option is
                    available.
                  </strong>
                </div>
              </div>

              <div className="fulfilment-box">
                <h3>
                  Select Your Pickup Schedule
                </h3>

                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="pickupDate">
                      Pickup date *
                    </label>

                    <input
                      id="pickupDate"
                      name="pickupDate"
                      type="date"
                      min={
                        getLocalDateString()
                      }
                      value={
                        form.pickupDate
                      }
                      aria-invalid={Boolean(
                        errors.pickupDate,
                      )}
                      onChange={updateField}
                    />

                    <FieldError
                      message={
                        errors.pickupDate
                      }
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="pickupTime">
                      Pickup time *
                    </label>

                    <select
                      id="pickupTime"
                      name="pickupTime"
                      value={
                        form.pickupTime
                      }
                      aria-invalid={Boolean(
                        errors.pickupTime,
                      )}
                      onChange={updateField}
                    >
                      <option value="">
                        Select a time
                      </option>

                      <option value="12:00 PM – 1:00 PM">
                        12:00 PM – 1:00 PM
                      </option>

                      <option value="1:00 PM – 2:00 PM">
                        1:00 PM – 2:00 PM
                      </option>

                      <option value="4:00 PM – 5:00 PM">
                        4:00 PM – 5:00 PM
                      </option>

                      <option value="5:00 PM – 6:00 PM">
                        5:00 PM – 6:00 PM
                      </option>
                    </select>

                    <FieldError
                      message={
                        errors.pickupTime
                      }
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {currentStep === 3 && (
            <section aria-labelledby="payment-heading">
              <p className="eyebrow">
                STEP_03
              </p>

              <h2 id="payment-heading">
                Payment Method
              </h2>

              <p>
                Select DuitNow QR or pay cash
                when collecting your order.
              </p>

              <div className="payment-method-list">
                <label
                  className={`payment-card ${
                    form.paymentMethod ===
                    "duitnow"
                      ? "is-selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="duitnow"
                    checked={
                      form.paymentMethod ===
                      "duitnow"
                    }
                    onChange={updateField}
                  />

                  <span className="payment-card-icon">
                    QR
                  </span>

                  <span>
                    <strong>
                      DuitNow QR
                    </strong>

                    <small>
                      Scan the QR code, pay the
                      exact amount, and upload
                      your receipt.
                    </small>
                  </span>
                </label>

                <label
                  className={`payment-card ${
                    form.paymentMethod ===
                    "cash"
                      ? "is-selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={
                      form.paymentMethod ===
                      "cash"
                    }
                    onChange={updateField}
                  />

                  <span className="payment-card-icon">
                    RM
                  </span>

                  <span>
                    <strong>
                      Cash at Pickup
                    </strong>

                    <small>
                      Pay the exact amount when
                      collecting your order at
                      EDU Café.
                    </small>
                  </span>
                </label>
              </div>

              <FieldError
                message={
                  errors.paymentMethod
                }
              />

              {form.paymentMethod ===
                "duitnow" && (
                <div className="duitnow-payment-panel">
                  <div className="duitnow-qr-layout">
                    <div>
                      <p className="eyebrow">
                        SCAN_TO_PAY
                      </p>

                      <h3>
                        Pay{" "}
                        {formatCurrency(
                          subtotal,
                        )}
                      </h3>

                      <p>
                        Scan the Loopify DuitNow
                        QR code using your
                        banking or e-wallet
                        application.
                      </p>

                      <img
                        className="duitnow-qr-image"
                        src={duitNowQr}
                        alt="Loopify DuitNow QR code for customer payment"
                        />
                    </div>

                    <div className="receipt-upload">
                      <h3>
                        Upload Payment Proof
                      </h3>

                      <p>
                        After completing the
                        payment, upload a clear
                        screenshot or PDF of the
                        receipt.
                      </p>

                      <label htmlFor="payment-receipt">
                        Payment receipt *
                      </label>

                      <input
                        id="payment-receipt"
                        name="paymentReceipt"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                        aria-invalid={Boolean(
                          errors.receipt,
                        )}
                        onChange={
                          handleReceiptUpload
                        }
                      />

                      <small>
                        Accepted formats: JPG,
                        JPEG, PNG, or PDF.
                        Maximum size: 5 MB.
                      </small>

                      <FieldError
                        message={
                          errors.receipt
                        }
                      />

                      {receiptFile && (
                        <div className="uploaded-file">
                          <div>
                            <strong>
                              Receipt selected
                            </strong>

                            <span>
                              {
                                receiptFile.name
                              }
                            </span>

                            <small>
                              {(
                                receiptFile.size /
                                1024 /
                                1024
                              ).toFixed(2)}{" "}
                              MB
                            </small>
                          </div>

                          <button
                            type="button"
                            onClick={
                              removeReceipt
                            }
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="payment-security-notice">
                    <strong>
                      Before uploading
                    </strong>

                    <p>
                      Confirm that the payment
                      amount and recipient are
                      correct. Do not upload
                      passwords, PIN numbers, or
                      full banking login
                      information.
                    </p>
                  </div>
                </div>
              )}

              {form.paymentMethod ===
                "cash" && (
                <div className="cash-payment-notice">
                  <strong>
                    Cash payment selected
                  </strong>

                  <p>
                    Prepare{" "}
                    {formatCurrency(subtotal)}{" "}
                    and pay when collecting your
                    order at EDU Café.
                  </p>
                </div>
              )}
            </section>
          )}

          {currentStep === 4 && (
            <section aria-labelledby="review-heading">
              <p className="eyebrow">
                STEP_04
              </p>

              <h2 id="review-heading">
                Review Your Order
              </h2>

              <div className="review-section">
                <div className="review-section-heading">
                  <h3>
                    Customer Details
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentStep(1)
                    }
                  >
                    Edit
                  </button>
                </div>

                <p>
                  <strong>
                    {form.fullName}
                  </strong>
                </p>

                <p>{form.email}</p>
                <p>{form.phone}</p>

                {form.matricNumber && (
                  <p>
                    Matric number:{" "}
                    {form.matricNumber}
                  </p>
                )}
              </div>

              <div className="review-section">
                <div className="review-section-heading">
                  <h3>Campus Pickup</h3>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentStep(2)
                    }
                  >
                    Edit
                  </button>
                </div>

                <p>
                  <strong>EDU Café</strong>
                </p>

                <p>
                  Near the Kulliyyah of
                  Engineering and Education
                  buildings
                </p>

                <p>
                  Pickup date:{" "}
                  {form.pickupDate}
                </p>

                <p>
                  Pickup time:{" "}
                  {form.pickupTime}
                </p>
              </div>

              <div className="review-section">
                <div className="review-section-heading">
                  <h3>Payment</h3>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentStep(3)
                    }
                  >
                    Edit
                  </button>
                </div>

                <p>
                  <strong>
                    {getPaymentMethodLabel(
                      form.paymentMethod,
                    )}
                  </strong>
                </p>

                {form.paymentMethod ===
                  "duitnow" &&
                  receiptFile && (
                    <>
                      <p>
                        Payment proof uploaded
                      </p>

                      <p>
                        Receipt:{" "}
                        {receiptFile.name}
                      </p>
                    </>
                  )}

                {form.paymentMethod ===
                  "cash" && (
                  <p>
                    Payment will be made during
                    pickup.
                  </p>
                )}
              </div>

              <div className="review-section">
                <h3>Order Items</h3>

                {cartItems.map((item) => (
                  <div
                    className="review-item"
                    key={item.id}
                  >
                    <span>
                      {item.name} ×{" "}
                      {item.quantity}
                    </span>

                    <strong>
                      {formatCurrency(
                        item.price *
                          item.quantity,
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={
                    form.agreeTerms
                  }
                  onChange={updateField}
                />

                <span>
                  I understand that the exact
                  charm design is randomly
                  selected. I confirm that my
                  pickup and payment information
                  is correct, and I agree to the{" "}
                    <Link to="/terms">
                    Terms and Conditions
                    </Link>{" "}
                    and acknowledge the{" "}
                    <Link to="/privacy">
                    Privacy Policy
                    </Link>.
                </span>
              </label>

              <FieldError
                message={errors.agreeTerms}
              />

              <FieldError
                message={errors.submit}
              />
            </section>
          )}

          <div className="checkout-navigation">
            {currentStep > 1 ? (
              <button
                className="button button-secondary"
                type="button"
                onClick={
                  moveToPreviousStep
                }
              >
                Back
              </button>
            ) : (
              <Link
                className="button button-secondary"
                to="/cart"
              >
                Return to Cart
              </Link>
            )}

            {currentStep < 4 ? (
              <button
                className="button button-primary"
                type="button"
                onClick={moveToNextStep}
              >
                Continue
              </button>
            ) : (
              <button
                className="button button-primary"
                type="button"
                disabled={isSubmitting}
                onClick={placeOrder}
              >
                {isSubmitting
                  ? "Processing..."
                  : `Place Order — ${formatCurrency(
                      subtotal,
                    )}`}
              </button>
            )}
          </div>
        </div>

        <aside className="checkout-summary">
          <h2>Your Order</h2>

          <div className="checkout-summary-items">
            {cartItems.map((item) => (
              <div
                className="checkout-summary-item"
                key={item.id}
              >
                <div>
                  <strong>
                    {item.shortName}
                  </strong>

                  <span>
                    Quantity:{" "}
                    {item.quantity}
                  </span>
                </div>

                <strong>
                  {formatCurrency(
                    item.price *
                      item.quantity,
                  )}
                </strong>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Mystery boxes</span>
            <strong>
              {totalBoxes}
            </strong>
          </div>

          <div className="summary-row">
            <span>
              Campus pickup
            </span>

            <strong>Free</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              {formatCurrency(subtotal)}
            </strong>
          </div>

          <p>
            All orders are collected at EDU
            Café. Delivery is not available.
          </p>
        </aside>
      </div>
    </section>
  );
}