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
    name: "Fulfilment",
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

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    matricNumber: "",
    notes: "",

    fulfilmentMethod: "pickup",
    pickupDate: "",
    pickupTime: "",

    addressLine: "",
    city: "",
    state: "",
    postcode: "",
    deliveryNotes: "",

    paymentMethod: "",
    agreeTerms: false,
  });

  function updateField(event) {
    const { name, type, checked, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
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
      if (form.fulfilmentMethod === "pickup") {
        if (!form.pickupDate) {
          nextErrors.pickupDate =
            "Choose a pickup date.";
        }

        if (!form.pickupTime) {
          nextErrors.pickupTime =
            "Choose a pickup time.";
        }
      }

      if (form.fulfilmentMethod === "delivery") {
        if (form.addressLine.trim().length < 5) {
          nextErrors.addressLine =
            "Enter a complete delivery address.";
        }

        if (form.city.trim().length < 2) {
          nextErrors.city = "Enter your city.";
        }

        if (!form.state) {
          nextErrors.state = "Select your state.";
        }

        if (!/^\d{5}$/.test(form.postcode)) {
          nextErrors.postcode =
            "Enter a valid five-digit postcode.";
        }
      }
    }

    if (step === 3 && !form.paymentMethod) {
      nextErrors.paymentMethod =
        "Select a payment method.";
    }

    if (step === 4 && !form.agreeTerms) {
      nextErrors.agreeTerms =
        "You must accept the terms before placing the order.";
    }

    return nextErrors;
  }

  function moveToNextStep() {
    const nextErrors = validateStep(currentStep);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setCurrentStep((step) => Math.min(4, step + 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function moveToPreviousStep() {
    setErrors({});
    setCurrentStep((step) => Math.max(1, step - 1));

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

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);

      const detailFields = [
        "fullName",
        "email",
        "phone",
      ];

      const fulfilmentFields = [
        "pickupDate",
        "pickupTime",
        "addressLine",
        "city",
        "state",
        "postcode",
      ];

      if (
        detailFields.some((field) => allErrors[field])
      ) {
        setCurrentStep(1);
      } else if (
        fulfilmentFields.some(
          (field) => allErrors[field],
        )
      ) {
        setCurrentStep(2);
      } else if (allErrors.paymentMethod) {
        setCurrentStep(3);
      } else {
        setCurrentStep(4);
      }

      return;
    }

    setIsSubmitting(true);

    const order = {
      orderNumber: `LPF-${Date.now()
        .toString()
        .slice(-8)}`,
      createdAt: new Date().toISOString(),
      status: "Order confirmed",
      items: cartItems,
      totalBoxes,
      subtotal,
      customer: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        matricNumber: form.matricNumber,
        notes: form.notes,
      },
      fulfilment: {
        method: form.fulfilmentMethod,
        pickupDate: form.pickupDate,
        pickupTime: form.pickupTime,
        addressLine: form.addressLine,
        city: form.city,
        state: form.state,
        postcode: form.postcode,
        deliveryNotes: form.deliveryNotes,
      },
      paymentMethod: form.paymentMethod,
    };

    try {
      localStorage.setItem(
        "loopify-last-order",
        JSON.stringify(order),
      );

      clearCart();
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Unable to create the order:", error);

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
        <div className="empty-cart-symbol" aria-hidden="true">
          !
        </div>

        <p className="eyebrow">CHECKOUT_UNAVAILABLE</p>
        <h1>Your checkout is empty</h1>

        <p>
          Add at least one Loopify mystery box before beginning
          checkout.
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
        <p className="eyebrow">SECURE_CHECKOUT.EXE</p>
        <h1>Complete Your Order</h1>

        <p>
          Complete each step below. Required fields are marked
          with an asterisk.
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
              <p className="eyebrow">STEP_01</p>
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
                    aria-invalid={
                      Boolean(errors.fullName)
                    }
                    onChange={updateField}
                  />

                  <FieldError
                    message={errors.fullName}
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
                    aria-invalid={Boolean(errors.email)}
                    onChange={updateField}
                  />

                  <FieldError message={errors.email} />
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
                    aria-invalid={Boolean(errors.phone)}
                    onChange={updateField}
                  />

                  <FieldError message={errors.phone} />
                </div>

                <div className="form-field">
                  <label htmlFor="matricNumber">
                    IIUM matric number
                  </label>

                  <input
                    id="matricNumber"
                    name="matricNumber"
                    type="text"
                    value={form.matricNumber}
                    onChange={updateField}
                  />

                  <small>
                    Optional. Useful for campus pickup
                    identification.
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
                    Do not enter passwords or banking
                    information.
                  </small>
                </div>
              </div>
            </section>
          )}

          {currentStep === 2 && (
            <section aria-labelledby="fulfilment-heading">
              <p className="eyebrow">STEP_02</p>
              <h2 id="fulfilment-heading">
                Choose Fulfilment
              </h2>

              <div className="radio-card-grid">
                <label
                  className={`radio-card ${
                    form.fulfilmentMethod === "pickup"
                      ? "is-selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="fulfilmentMethod"
                    value="pickup"
                    checked={
                      form.fulfilmentMethod === "pickup"
                    }
                    onChange={updateField}
                  />

                  <span>
                    <strong>Campus Pickup</strong>
                    <small>
                      Collect your order at EDU Café.
                    </small>
                  </span>
                </label>

                <label
                  className={`radio-card ${
                    form.fulfilmentMethod === "delivery"
                      ? "is-selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="fulfilmentMethod"
                    value="delivery"
                    checked={
                      form.fulfilmentMethod ===
                      "delivery"
                    }
                    onChange={updateField}
                  />

                  <span>
                    <strong>Delivery</strong>
                    <small>
                      Provide an address for delivery.
                    </small>
                  </span>
                </label>
              </div>

              {form.fulfilmentMethod === "pickup" && (
                <div className="fulfilment-box">
                  <h3>EDU Café Pickup Point</h3>

                  <p>
                    Near the Kulliyyah of Engineering and
                    Education buildings.
                  </p>

                  <div className="form-grid">
                    <div className="form-field">
                      <label htmlFor="pickupDate">
                        Pickup date *
                      </label>

                      <input
                        id="pickupDate"
                        name="pickupDate"
                        type="date"
                        min={getLocalDateString()}
                        value={form.pickupDate}
                        aria-invalid={Boolean(
                          errors.pickupDate,
                        )}
                        onChange={updateField}
                      />

                      <FieldError
                        message={errors.pickupDate}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="pickupTime">
                        Pickup time *
                      </label>

                      <select
                        id="pickupTime"
                        name="pickupTime"
                        value={form.pickupTime}
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
                        message={errors.pickupTime}
                      />
                    </div>
                  </div>
                </div>
              )}

              {form.fulfilmentMethod ===
                "delivery" && (
                <div className="fulfilment-box">
                  <h3>Delivery Address</h3>

                  <div className="form-grid">
                    <div className="form-field form-field-full">
                      <label htmlFor="addressLine">
                        Address *
                      </label>

                      <input
                        id="addressLine"
                        name="addressLine"
                        type="text"
                        autoComplete="street-address"
                        value={form.addressLine}
                        aria-invalid={Boolean(
                          errors.addressLine,
                        )}
                        onChange={updateField}
                      />

                      <FieldError
                        message={errors.addressLine}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="city">
                        City *
                      </label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        value={form.city}
                        aria-invalid={Boolean(errors.city)}
                        onChange={updateField}
                      />

                      <FieldError message={errors.city} />
                    </div>

                    <div className="form-field">
                      <label htmlFor="state">
                        State *
                      </label>

                      <select
                        id="state"
                        name="state"
                        value={form.state}
                        aria-invalid={Boolean(
                          errors.state,
                        )}
                        onChange={updateField}
                      >
                        <option value="">
                          Select a state
                        </option>
                        <option value="Selangor">
                          Selangor
                        </option>
                        <option value="Kuala Lumpur">
                          Kuala Lumpur
                        </option>
                        <option value="Putrajaya">
                          Putrajaya
                        </option>
                        <option value="Negeri Sembilan">
                          Negeri Sembilan
                        </option>
                        <option value="Other">
                          Other
                        </option>
                      </select>

                      <FieldError
                        message={errors.state}
                      />
                    </div>

                    <div className="form-field">
                      <label htmlFor="postcode">
                        Postcode *
                      </label>

                      <input
                        id="postcode"
                        name="postcode"
                        type="text"
                        inputMode="numeric"
                        maxLength="5"
                        autoComplete="postal-code"
                        value={form.postcode}
                        aria-invalid={Boolean(
                          errors.postcode,
                        )}
                        onChange={updateField}
                      />

                      <FieldError
                        message={errors.postcode}
                      />
                    </div>

                    <div className="form-field form-field-full">
                      <label htmlFor="deliveryNotes">
                        Delivery notes
                      </label>

                      <textarea
                        id="deliveryNotes"
                        name="deliveryNotes"
                        rows="3"
                        value={form.deliveryNotes}
                        onChange={updateField}
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {currentStep === 3 && (
            <section aria-labelledby="payment-heading">
              <p className="eyebrow">STEP_03</p>
              <h2 id="payment-heading">
                Payment Method
              </h2>

              <p>
                These are prototype payment options. Do not
                enter real banking passwords or card
                information.
              </p>

              <div className="payment-method-list">
                <label
                  className={`payment-card ${
                    form.paymentMethod === "duitnow"
                      ? "is-selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="duitnow"
                    checked={
                      form.paymentMethod === "duitnow"
                    }
                    onChange={updateField}
                  />

                  <span className="payment-card-icon">
                    QR
                  </span>

                  <span>
                    <strong>DuitNow QR</strong>
                    <small>
                      Scan the payment QR after order
                      confirmation.
                    </small>
                  </span>
                </label>

                <label
                  className={`payment-card ${
                    form.paymentMethod === "fpx"
                      ? "is-selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="fpx"
                    checked={
                      form.paymentMethod === "fpx"
                    }
                    onChange={updateField}
                  />

                  <span className="payment-card-icon">
                    FPX
                  </span>

                  <span>
                    <strong>FPX Online Banking</strong>
                    <small>
                      Continue to a secure banking gateway.
                    </small>
                  </span>
                </label>

                <label
                  className={`payment-card ${
                    form.paymentMethod === "ewallet"
                      ? "is-selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ewallet"
                    checked={
                      form.paymentMethod === "ewallet"
                    }
                    onChange={updateField}
                  />

                  <span className="payment-card-icon">
                    WAL
                  </span>

                  <span>
                    <strong>E-wallet</strong>
                    <small>
                      Pay using a supported Malaysian
                      e-wallet.
                    </small>
                  </span>
                </label>

                {form.fulfilmentMethod === "pickup" && (
                  <label
                    className={`payment-card ${
                      form.paymentMethod === "cash"
                        ? "is-selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={
                        form.paymentMethod === "cash"
                      }
                      onChange={updateField}
                    />

                    <span className="payment-card-icon">
                      RM
                    </span>

                    <span>
                      <strong>Cash at Pickup</strong>
                      <small>
                        Pay when collecting at the campus
                        pickup point.
                      </small>
                    </span>
                  </label>
                )}
              </div>

              <FieldError
                message={errors.paymentMethod}
              />

              <div className="payment-security-notice">
                <strong>Prototype security notice</strong>

                <p>
                  Real payment processing requires a verified
                  payment gateway and secure backend. This
                  prototype only records the selected payment
                  method.
                </p>
              </div>
            </section>
          )}

          {currentStep === 4 && (
            <section aria-labelledby="review-heading">
              <p className="eyebrow">STEP_04</p>
              <h2 id="review-heading">
                Review Your Order
              </h2>

              <div className="review-section">
                <div className="review-section-heading">
                  <h3>Customer Details</h3>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                  >
                    Edit
                  </button>
                </div>

                <p>
                  <strong>{form.fullName}</strong>
                </p>
                <p>{form.email}</p>
                <p>{form.phone}</p>

                {form.matricNumber && (
                  <p>
                    Matric number: {form.matricNumber}
                  </p>
                )}
              </div>

              <div className="review-section">
                <div className="review-section-heading">
                  <h3>Fulfilment</h3>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                  >
                    Edit
                  </button>
                </div>

                {form.fulfilmentMethod === "pickup" ? (
                  <>
                    <p>
                      <strong>Campus Pickup</strong>
                    </p>
                    <p>EDU Café</p>
                    <p>{form.pickupDate}</p>
                    <p>{form.pickupTime}</p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Delivery</strong>
                    </p>
                    <p>{form.addressLine}</p>
                    <p>
                      {form.postcode} {form.city},{" "}
                      {form.state}
                    </p>
                  </>
                )}
              </div>

              <div className="review-section">
                <div className="review-section-heading">
                  <h3>Payment</h3>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                  >
                    Edit
                  </button>
                </div>

                <p>
                  {form.paymentMethod === "duitnow" &&
                    "DuitNow QR"}

                  {form.paymentMethod === "fpx" &&
                    "FPX Online Banking"}

                  {form.paymentMethod === "ewallet" &&
                    "E-wallet"}

                  {form.paymentMethod === "cash" &&
                    "Cash at Pickup"}
                </p>
              </div>

              <div className="review-section">
                <h3>Order Items</h3>

                {cartItems.map((item) => (
                  <div
                    className="review-item"
                    key={item.id}
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <strong>
                      {formatCurrency(
                        item.price * item.quantity,
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={updateField}
                />

                <span>
                  I understand that the exact charm design is
                  randomly selected, and I agree to the website
                  terms and conditions.
                </span>
              </label>

              <FieldError message={errors.agreeTerms} />

              <FieldError message={errors.submit} />
            </section>
          )}

          <div className="checkout-navigation">
            {currentStep > 1 ? (
              <button
                className="button button-secondary"
                type="button"
                onClick={moveToPreviousStep}
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
                  <strong>{item.shortName}</strong>
                  <span>
                    Quantity: {item.quantity}
                  </span>
                </div>

                <strong>
                  {formatCurrency(
                    item.price * item.quantity,
                  )}
                </strong>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Mystery boxes</span>
            <strong>{totalBoxes}</strong>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>
              {formatCurrency(subtotal)}
            </strong>
          </div>

          <p>
            The total currently includes the selected products.
            Campus pickup has no additional charge.
          </p>
        </aside>
      </div>
    </section>
  );
}