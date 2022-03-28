/*
 *
 * Router and handlers for Pizza API
 *
 */

// Dependencies
const helpers = require("./helpers");
const config = require("../config");
const _data = require("./data");

// Define the handlers
const handlers = {};

/*
 *  JSON API Handlers
 *
 */

// Container for the users sub methods
_users = {};

handlers.users = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  const { method } = data;
  if (acceptableMethods.includes(method)) {
    _users[method](data, callback);
  } else {
    callback(405);
  }
};

// Create a new user
// Route            POST api/users      payload
// Required data    name, email, password, address
// Optional data    none
_users.post = (data, callback) => {
  const { name, email, password, address } = data.payload;

  // Payload validation
  if (!name) {
    callback(400, { error: "Request should include name in its request body" });
    return;
  }
  if (typeof name !== "string") {
    callback(400, {
      error: "Request should include a valid name in its request body",
    });
    return;
  }
  if (!email) {
    callback(400, {
      error: "Request should include email in its request body",
    });
    return;
  }
  if (!helpers.validateEmail(email)) {
    callback(400, { error: "Provided email address is invalid" });
    return;
  }
  if (!password) {
    callback(400, {
      error: "Request should include password in its request body",
    });
    return;
  }
  if (!helpers.validatePassword(password)) {
    callback(400, {
      error: "Request should include a valid password (min. 5 characters long)",
    });
    return;
  }
  if (typeof address !== "string" && address.trim().length === 0) {
    callback(400, {
      error:
        'The request should include and address field e.g. "Hooiland 20, 5663HC Geldrop" in its request body',
    });
    return;
  }

  // Read user file to see if they already exists?
  _data.read("users", email, (err) => {
    if (!err) {
      // User already exists
      console.log("User already exists: ", email);
      callback(400, {
        error: "A user with email address " + email + " already exists",
      });
      return;
    }

    // Create new user object
    const newUser = {
      name,
      email,
      hashedPassword: helpers.hash(password),
      address,
    };
    _data.create("users", email, newUser, (err) => {
      if (!err) {
        _data.create("users", email + "-cart", [], (err) => {
          if (!err) {
            callback(200);
          } else {
            console.log(err);
            callback(500, { error: "Could not create the new user's cart" });
          }
        });
      } else {
        console.log(err);
        callback(500, { error: "Could not create the new user" });
      }
    });
  });
};

// Get user details
// Route            GET api/users
// Required data    email, token
// Optional data    none
_users.get = (data, callback) => {
  // Get the email address from the query string and the token from the headers
  const { email } = data.queryStringObject;

  if (!helpers.validateEmail(email)) {
    callback(400, { error: "Missing or invalid email address provided" });
    return;
  }

  const token =
    typeof data.headers.token === "string" ? data.headers.token : false;

  _tokens.verifyToken(token, email, function (tokenIsValid) {
    if (tokenIsValid) {
      // Lookup the user
      _data.read("users", email, function (err, data) {
        if (!err && data) {
          delete data.hashedPassword;
          callback(200, data);
        } else {
          callback(404, { error: "User does not exist" });
        }
      });
    } else {
      callback(403, {
        error: "Missing required token in header, or token is invalid",
      });
    }
  });
};

// Update user details
// Route            PUT api/users       payload
// Required data    email
// Optional data    password, name, address
_users.put = function (data, callback) {
  const { payload } = data;

  // Payload validation
  const email = helpers.validateEmail(payload.email) ? payload.email : false;
  const password = helpers.validatePassword(payload.password)
    ? payload.password
    : false;
  const name =
    typeof payload.name === "string" && payload.name.trim().length > 0
      ? payload.name
      : false;
  const address =
    typeof payload.address === "string" && payload.address.trim().length > 0
      ? payload.address
      : false;

  if (!email) {
    callback(400, {
      error: "Request should include email in its request body",
    });
    return;
  }

  if (!password && !name && !address) {
    callback(400, { error: "Missing fields to update" });
    return;
  }

  // Get the token from the headers
  const token =
    typeof data.headers.token === "string" ? data.headers.token : false;

  if (!token) {
    callback(400, {
      error: "Missing required token in header, or token is invalid",
    });
    return;
  }

  _tokens.verifyToken(token, email, function (tokenIsValid) {
    if (tokenIsValid) {
      // lookup the user
      _data.read("users", email, function (err, userData) {
        if (!err && userData) {
          // Update the fields.

          if (name) userData.name = name;
          if (address) userData.address = address;
          if (password) userData.hashedPassword = helpers.hash(password);

          // Store the new updates
          _data.update("users", email, userData, function (err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, { error: "Unable to update user data" });
            }
          });
        } else {
          callback(400, { error: "The specified user does not exist" });
        }
      });
    } else {
      callback(403, {
        error: "Token is invalid or no match between token and email",
      });
    }
  });
};

// Delete a user
// Route            DELETE api/users    payload
// Required data    email
// Optional data    none
_users.delete = function (data, callback) {
  const email =
    typeof data.payload.email === "string" ? data.payload.email : false;

  if (!helpers.validateEmail(email)) {
    callback(400, {
      error: "Request should include email in its request body",
    });
    return;
  }

  // Get the token from the headers
  const token =
    typeof data.headers.token === "string" ? data.headers.token : false;

  if (!token) {
    callback(400, {
      error: "Missing required token in header, or token is invalid",
    });
    return;
  }

  _tokens.verifyToken(token, email, function (tokenIsValid) {
    if (tokenIsValid) {
      // Lookup the user
      _data.read("users", email, function (err, userData) {
        if (!err && userData) {
          _data.delete("users", email, function (err) {
            if (!err) {
              _data.delete("users", `${email}-cart`, function (err) {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, {
                    error: "Could not delete cart of specified user",
                  });
                }
              });
            } else {
              callback(500, { error: "Could not delete specified user" });
            }
          });
        } else {
          callback(400, { error: "Could not find specified user" });
        }
      });
    } else {
      callback(403, {
        error: "Token is invalid or no match between token and email",
      });
    }
  });
};

// container for all token methods
_tokens = {};

handlers.tokens = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.includes(data.method)) {
    _tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Create a new token
// Route            POST api/tokens     payload
// Required data    email, password
// Optional data    none
_tokens.post = function (data, callback) {
  const { payload } = data;

  const email = helpers.validateEmail(payload.email) ? payload.email : false;
  const password = helpers.validatePassword(payload.password)
    ? payload.password
    : false;

  // Check for a valid email and password
  if (!email) {
    callback(400, { error: "Request should include a valid email address" });
    return;
  }

  if (!password) {
    callback(400, {
      error:
        "Request should include a password and it should meet the minimum requirements",
    });
    return;
  }

  // Read user data
  _data.read("users", email, function (err, userData) {
    if (!err && data) {
      // Compare passwords
      if (helpers.hash(password) === userData.hashedPassword) {
        // Valid password, create new token with expiration date (1 hour in the future);
        const tokenId = helpers.createRandomString(22);
        const expires = Date.now() + 1000 * 60 * 60;
        const tokenObject = {
          email,
          id: tokenId,
          expires,
        };
        // Write the token to disk
        _data.create("tokens", tokenId, tokenObject, function (err) {
          if (!err) {
            callback(200, tokenObject);
          } else {
            callback(500, { error: "Could not create new token" });
          }
        });
      } else {
        callback(400, { error: "password did not match" });
      }
    } else {
      callback(400, { error: "Could not find the specified user" });
    }
  });
};

// Get token information
// Route            GET api/tokens      query string
// Required data    id
// Optional data    none
_tokens.get = function (data, callback) {
  const { id } = data.queryStringObject;
  if (typeof id === "string" && id.trim().length === 22) {
    // Lookup the token
    _data.read("tokens", id, function (err, tokenData) {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404, { error: "Token does not exist" });
      }
    });
  } else {
    callback(404, { error: "Token ID could not be found" });
  }
};

// Extend a token
// Route            PUT api/tokens     payload
// Required data    id, extend
// Optional data    none
_tokens.put = function (data, callback) {
  const { payload } = data;
  const id =
    typeof payload.id === "string" && payload.id.trim().length === 22
      ? payload.id.trim()
      : false;
  const extend = typeof payload.extend === "boolean" && payload.extend;

  if (!id || !extend) {
    callback(400, {
      error:
        "Invalid ID or extend: true is not included. Token cannot be extended",
    });
    return;
  }

  // Look up the token
  _data.read("tokens", id, function (err, tokenData) {
    if (!err && tokenData) {
      // Make sure the token isn't already expired
      const { expires } = tokenData;
      if (expires > Date.now()) {
        // Set the expiration 1 hour ahead
        tokenData.expires = Date.now() + 1000 * 60 * 60;
        _data.update("tokens", id, tokenData, function (err) {
          if (!err) {
            callback(200, { data: { expirationDate: tokenData.expires } });
          } else {
            console.log(err);
            callback(500, { error: "Unable to update token's expiration" });
          }
        });
      } else {
        callback(400, { error: "The token is expired and cannot be extended" });
      }
    } else {
      callback(400, { error: "Specified token does not exist" });
    }
  });
};

// Delete a new token
// Route            DELETE api/tokens   query string
// Required data    id
// Optional data    none
_tokens.delete = function (data, callback) {
  // Check that the token ID is valid
  const { id } = data.payload;
  console.log({ data });
  if (typeof id === "string" && id.trim().length === 22) {
    _data.read("tokens", id, function (err, data) {
      if (!err && data) {
        _data.delete("tokens", id, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, { error: "Could not delete specified token" });
          }
        });
      } else {
        callback(400, { error: "Could not find specified token" });
      }
    });
  } else {
    callback(400, { error: "Token ID not found" });
  }
};

// Verify is a given token id is currently valid for a given user.
_tokens.verifyToken = function (id, email, callback) {
  _data.read("tokens", id, function (err, tokenData) {
    if (!err && tokenData) {
      // Check if the token is for a given user and has not expired
      if (tokenData.email === email && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// container for all menu methods
_menu = {};

handlers.menu = function (data, callback) {
  const acceptableMethods = ["get"];
  if (acceptableMethods.includes(data.method)) {
    _menu[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Gather a list of all menu or one item(s)
// Route            GET api/menu        query string
// Required data    email, token
// Optional data    none
_menu.get = (data, callback) => {
  const { queryStringObject } = data;
  const email = helpers.validateEmail(queryStringObject.email)
    ? queryStringObject.email
    : false;
  const token =
    typeof data.headers.token === "string" ? data.headers.token : false;

  if (!email) {
    callback(400, { error: "Missing or invalid email address provided" });
    return;
  }

  if (!token) {
    callback(400, {
      error: "Missing required token in header, or token is invalid",
    });
    return;
  }

  _tokens.verifyToken(token, email, function (tokenIsValid) {
    if (tokenIsValid) {
      _data.read("menu", "menu", (err, menuData) => {
        if (!err && menuData) {
          callback(200, menuData);
        } else {
          callback(400, { error: "Could not load menu" });
        }
      });
    } else {
      callback(403, {
        error: "Token is invalid or no match between token and email",
      });
    }
  });
};

// container for all menu methods
_cart = {};

handlers.cart = function (data, callback) {
  const acceptableMethods = ["post", "get", "delete"];
  if (acceptableMethods.includes(data.method)) {
    _cart[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Add menu item to the user's cart
// Route            POST api/cart        payload
// Required data    email, token, id, size, amount
// Optional data    none
_cart.post = (data, callback) => {
  const { payload, headers } = data;
  const email = helpers.validateEmail(payload.email) ? payload.email : false;
  const token = typeof headers.token === "string" ? headers.token : false;
  const id =
    typeof payload.id === "string" && payload.id.trim().length === 14
      ? payload.id
      : false;
  const size = [10, 12, 14, 16, 18].includes(payload.size)
    ? payload.size
    : false; // 10: Small, 12: Medium, 14: Large, 16: Family, 18: Party
  const amount = typeof payload.amount === "number" ? payload.amount : false;

  if (!email) {
    callback(400, { error: "Missing or invalid email address provided" });
    return;
  }

  if (!token) {
    callback(400, {
      error: "Missing required token in header, or token is invalid",
    });
    return;
  }

  if (!id) {
    callback(400, { error: "No menu item present to add to the cart" });
    return;
  }

  if (!size) {
    callback(400, {
      error: "Size missing or invalid (available options: 10, 12, 14, 16, 18)",
    });
    return;
  }

  if (!amount) {
    callback(400, { error: "Missing amount" });
    return;
  }

  const fileName = email + "-cart";
  const newItem = {
    id,
    size,
    amount,
  };

  _tokens.verifyToken(token, email, function (tokenIsValid) {
    if (tokenIsValid) {
      _data.read("users", fileName, (err, cartData) => {
        if (!err && cartData) {
          // Add the new item to the cart
          cartData.push(newItem);

          _data.update("users", fileName, cartData, (err) => {
            if (!err) {
              callback(200);
            } else {
              callback(500, { error: "Unable to update cart" });
            }
          });
        } else {
          callback(400, { error: "Could not load cart" });
        }
      });
    } else {
      callback(403, {
        error: "Token is invalid or no match between token and email",
      });
    }
  });
};

// View user's cart
// Route            GET api/cart        query string
// Required data    email, token
// Optional data    none
_cart.get = (data, callback) => {
  const { queryStringObject: query, headers } = data;
  const email = helpers.validateEmail(query.email) ? query.email : false;
  const token = typeof headers.token === "string" ? headers.token : false;

  if (!email) {
    callback(400, { error: "Missing or invalid email address provided" });
    return;
  }

  if (!token) {
    callback(400, {
      error: "Missing required token in header, or token is invalid",
    });
    return;
  }

  _tokens.verifyToken(token, email, function (tokenIsValid) {
    if (tokenIsValid) {
      // Get the menu to create an overview
      _data.read("menu", "menu", (err, menuData) => {
        if (!err && menuData) {
          // Read the products the user has in their cart
          _data.read("users", `${email}-cart`, (err, cartData) => {
            if (!err && cartData) {
              const cartOverview = helpers.createCartOverview(
                cartData,
                menuData
              );
              callback(200, cartOverview);
            } else {
              callback(400, { error: "Could not load cart content" });
            }
          });
        } else {
          callback(400, {
            error: "Generating a cart overview failed, could not load menu",
          });
        }
      });
    } else {
      callback(403, {
        error: "Token is invalid or no match between token and email",
      });
    }
  });
};

// Remove item or empty user's cart
// Route            DELETE api/cart     query string
// Required data    email, token
// Optional data    index
_cart.delete = (data, callback) => {
  const { payload, headers } = data;
  const email = helpers.validateEmail(payload.email) ? payload.email : false;
  payload.index = parseFloat(payload.index);
  const index =
    !isNaN(payload.index) && payload.index % 1 === 0 ? payload.index : false;
  const token = typeof headers.token === "string" ? headers.token : false;

  if (!email) {
    callback(400, { error: "Missing or invalid email address provided" });
    return;
  }

  if (!token) {
    callback(400, {
      error: "Missing required token in header, or token is invalid",
    });
    return;
  }

  _tokens.verifyToken(token, email, function (tokenIsValid) {
    if (tokenIsValid) {
      _data.read("users", email + "-cart", (err, cartData) => {
        if (!err && cartData) {
          let updatedCart = [];
          if (index !== false && cartData[index]) {
            cartData.splice(index, 1);
            updatedCart = cartData;
          }
          _data.update("users", email + "-cart", updatedCart, (err) => {
            if (!err) {
              callback(200);
            } else {
              callback(400, {
                error: "Unable to clear cart. Please try again",
              });
            }
          });
        } else {
          callback(400, { error: "Could not load cart content" });
        }
      });
    } else {
      callback(403, {
        error: "Token is invalid or no match between token and email",
      });
    }
  });
};

handlers.order = (data, callback) => {
  const { method, payload, headers } = data;

  // Allow only post request to create an order
  if (method !== "post") {
    callback(405);
    return;
  }

  let email = helpers.validateEmail(payload.email) ? payload.email : false;
  const token = typeof headers.token === "string" ? headers.token : false;

  if (!email) {
    callback(400, { error: "Missing or invalid email address provided" });
    return;
  }

  if (!token) {
    callback(400, {
      error: "Missing required token in header, or token is invalid",
    });
    return;
  }

  _tokens.verifyToken(token, email, function (tokenIsValid) {
    if (tokenIsValid) {
      // Gather menu
      _data.read("menu", "menu", (err, menuData) => {
        if (!err && menuData) {
          // Gather cart details
          _data.read("users", email + "-cart", (err, cartData) => {
            if (!err && cartData) {
              // Gather user's address
              _data.read("users", email, (err, userData) => {
                if (!err && userData) {
                  // All data is gathered to start creating the order, make the payment and send a confirmation email

                  // Create an order
                  const order = {
                    id: helpers.createRandomString(10),
                    name: userData.name,
                    address: userData.address,
                    ...helpers.createCartOverview(cartData, menuData),
                  };

                  // Create Stripe payment and callback 200 when successful
                  // Because the payment has gone through successfully the 200 callback is here.
                  helpers.createStripePayment(order.id, order.total, (err) => {
                    if (!err) {
                      // payment was successful
                      callback(200);

                      // construct the email for the user.
                      const emailBody = helpers.createEmailBody(order);

                      // Email the order to the user.
                      helpers.sendConfirmationMail(
                        order.id,
                        email,
                        emailBody,
                        (err) => {
                          // Only log if an error has occurred.
                          if (err) {
                            console.log(
                              `${err}\nWhile processing order (${order.id}) a confirmation email could not be sent to ${email}`
                            );
                          }
                        }
                      );
                    } else {
                      console.log(err);
                      callback(500, { error: err });
                    }
                  });
                } else {
                  callback(400, { error: "Could not read user details" });
                }
              });
            } else {
              callback(400, { error: "Could not load cart content" });
            }
          });
        } else {
          callback(400, { error: "Could not load menu" });
        }
      });
    } else {
      callback(403, {
        error: "Token is invalid or no match between token and email",
      });
    }
  });
};

handlers.ping = function (data, callback) {
  callback();
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Available routes
const routesAndHandlers = {
  "api/users": handlers.users,
  "api/tokens": handlers.tokens,
  "api/cart": handlers.cart,
  "api/order": handlers.order,
  "api/menu": handlers.menu,
  notFound: handlers.notFound,
  public: handlers.public,
};

module.exports = routesAndHandlers;
