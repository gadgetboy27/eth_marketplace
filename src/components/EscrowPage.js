import React, { useState } from 'react';

const EscrowPage = ({ onBack }) => {
  const [isSeller, setIsSeller] = useState(true);
  const [formData, setFormData] = useState({
    itemDescription: '',
    itemDetails: '',
    amount: '',
    sellerEmail: '',
    buyerEmail: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Escrow API integration coming soon! This will create a secure transaction.');
    console.log('Form data:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="escrow-container">
      <main>
        <section className="py-5 container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="mb-4">
                <button onClick={onBack} className="btn btn-outline-secondary">
                  ← Back to Home
                </button>
              </div>

              <div className="card shadow-sm">
                <div className="card-body p-5">
                  <h2 className="mb-4">Create Escrow Transaction</h2>
                  <p className="text-muted mb-4">
                    Create a secure escrow transaction. Payment will be held safely until
                    the buyer confirms delivery.
                  </p>

                  {/* Role Selector */}
                  <div className="mb-4">
                    <label className="form-label fw-bold">I am the:</label>
                    <div className="btn-group d-block" role="group">
                      <button
                        type="button"
                        className={`btn ${isSeller ? 'btn-primary' : 'btn-outline-primary'} w-50`}
                        onClick={() => setIsSeller(true)}
                      >
                        Seller
                      </button>
                      <button
                        type="button"
                        className={`btn ${!isSeller ? 'btn-primary' : 'btn-outline-primary'} w-50`}
                        onClick={() => setIsSeller(false)}
                      >
                        Buyer
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* Item Description */}
                    <div className="mb-3">
                      <label className="form-label">Item Description *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="itemDescription"
                        value={formData.itemDescription}
                        onChange={handleChange}
                        placeholder="e.g., iPhone 13 Pro Max 256GB"
                        required
                      />
                    </div>

                    {/* Item Details */}
                    <div className="mb-3">
                      <label className="form-label">Additional Details</label>
                      <textarea
                        className="form-control"
                        name="itemDetails"
                        value={formData.itemDetails}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Condition, color, included accessories, etc."
                      />
                    </div>

                    {/* Amount */}
                    <div className="mb-3">
                      <label className="form-label">Amount (USD) *</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          placeholder="0.00"
                          step="0.01"
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    {/* Seller Email */}
                    <div className="mb-3">
                      <label className="form-label">
                        {isSeller ? 'Your Email (Seller)' : 'Seller Email'} *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="sellerEmail"
                        value={formData.sellerEmail}
                        onChange={handleChange}
                        placeholder="seller@example.com"
                        required
                      />
                    </div>

                    {/* Buyer Email */}
                    <div className="mb-3">
                      <label className="form-label">
                        {isSeller ? 'Buyer Email' : 'Your Email (Buyer)'} *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="buyerEmail"
                        value={formData.buyerEmail}
                        onChange={handleChange}
                        placeholder="buyer@example.com"
                        required
                      />
                    </div>

                    {/* Info Box */}
                    <div className="alert alert-info">
                      <h6 className="alert-heading">How it works:</h6>
                      <ol className="mb-0 ps-3">
                        <li>Create the transaction with item details</li>
                        <li>Buyer authorizes payment (funds held securely)</li>
                        <li>Seller ships the item</li>
                        <li>Buyer confirms delivery</li>
                        <li>Payment released to seller</li>
                      </ol>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-success btn-lg w-100">
                      Create Escrow Transaction
                    </button>

                    <p className="text-muted small text-center mt-3">
                      Both parties will receive email notifications with secure links
                      to track and manage the transaction.
                    </p>
                  </form>
                </div>
              </div>

              {/* Feature Cards */}
              <div className="row mt-4 g-3">
                <div className="col-md-4">
                  <div className="card text-center p-3">
                    <h6>🔒 Secure</h6>
                    <small className="text-muted">Payment held safely</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-center p-3">
                    <h6>✅ Protected</h6>
                    <small className="text-muted">Both parties protected</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card text-center p-3">
                    <h6>⚡ Fast</h6>
                    <small className="text-muted">Quick setup</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EscrowPage;
