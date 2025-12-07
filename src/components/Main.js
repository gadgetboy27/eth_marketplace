import React, { useState } from 'react';
import './App.css'; // Ensure your CSS file is correctly linked

const Main = (props) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleProductSubmit = (event) => {
    event.preventDefault();
    const name = productName;
    const price = window.ethers.utils.parseEther(productPrice.toString(), 'Ether');
    props.createProduct(name, price);
    // Clear input fields after submission
    setProductName('');
    setProductPrice('');
  };

  return (
    <div id='content'>
      <main>
        <section className="py-5 text-left container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              {props.onBack && (
                <div className="mb-3">
                  <button onClick={props.onBack} className="btn btn-outline-secondary btn-sm">
                    ← Back to Home
                  </button>
                </div>
              )}
              <h1 className="fw-light">Blockchain Based Buy n Sell Market</h1>
              <p className="lead text-muted">
                Something short and leading about the collection below—its contents, the creator, etc.
                Make it short and sweet, but not too short so folks don’t simply skip over it entirely.
              </p>
              <p>&nbsp;</p>
              <h2>Add Your Product</h2>
              <form onSubmit={handleProductSubmit}>
                <div className='form-group mr-sm-2'>
                  <input
                    id='productName'
                    type='text'
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className='form-control'
                    placeholder='Product Name'
                    required 
                  />
                </div>
                <div className='form-group mr-sm-2'>
                  <input
                    id='productPrice'
                    type='text'
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className='form-control'
                    placeholder='Product Price'
                    required 
                  />
                </div> 
                <button type="submit" className="btn btn-primary btn-md px-4 gap-3">Add Product</button>
              </form>
            </div>
          </div>

          <p>&nbsp;</p>
          <h2>Products To Buy</h2>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price in ETH</th>
                  <th scope="col">Owners Account</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody id='productList'>
                {props.products.map((product, key) => (
                  <tr key={key}>
                    <th scope='row'>{product.id.toString()}</th>
                    <td>{product.name}</td>
                    <td>{window.ethers.utils.parseEther(product.price.toString(), 'Ether')} ETH</td>
                    <td>{product.owner}</td>
                    <td>
                      {!product.purchased ? (
                        <button 
                          name={product.id}
                          value={product.price}
                          onClick={(event) => props.purchaseProduct(event.target.name, event.target.value)}
                        >
                          Buy Me
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Additional sections go here */}
      </main>

      {/* Bootstrap JS script */}
      <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
    </div>
  );
};

export default Main;
