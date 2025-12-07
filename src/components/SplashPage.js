import React from 'react';

const SplashPage = ({ onSelectMarketplace, onSelectEscrow }) => {
  return (
    <div className="splash-container">
      <main>
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-8 col-md-10 mx-auto">
              <h1 className="fw-bold display-4 mb-4">Welcome to Our Platform</h1>
              <p className="lead text-muted mb-5">
                Choose how you'd like to transact - through our blockchain marketplace
                or our secure escrow service.
              </p>

              <div className="row g-4 mt-4">
                {/* Blockchain Marketplace Option */}
                <div className="col-md-6">
                  <div className="card shadow-sm h-100">
                    <div className="card-body text-center p-4">
                      <div className="feature-icon bg-primary bg-gradient mb-3 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 16 16">
                          <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"/>
                          <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        </svg>
                      </div>
                      <h3 className="h4 mb-3">Web3 Marketplace</h3>
                      <p className="text-muted mb-4">
                        Buy and sell using blockchain technology. Connect with MetaMask
                        and trade securely on the Ethereum network.
                      </p>
                      <button
                        onClick={onSelectMarketplace}
                        className="btn btn-primary btn-lg px-4"
                      >
                        Enter Marketplace
                      </button>
                      <p className="text-muted small mt-3">
                        <small>Requires MetaMask wallet</small>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Escrow Service Option */}
                <div className="col-md-6">
                  <div className="card shadow-sm h-100">
                    <div className="card-body text-center p-4">
                      <div className="feature-icon bg-success bg-gradient mb-3 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 16 16">
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                        </svg>
                      </div>
                      <h3 className="h4 mb-3">Escrow Service</h3>
                      <p className="text-muted mb-4">
                        Secure transactions with buyer and seller protection.
                        Payment held safely until delivery is confirmed.
                      </p>
                      <button
                        onClick={onSelectEscrow}
                        className="btn btn-success btn-lg px-4"
                      >
                        Use Escrow
                      </button>
                      <p className="text-muted small mt-3">
                        <small>Credit card accepted</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="text-muted small">
                  Both services provide secure transactions with different payment methods.
                  Choose the option that best fits your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SplashPage;
