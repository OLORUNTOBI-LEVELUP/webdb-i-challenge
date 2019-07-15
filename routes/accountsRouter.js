    
const express = require("express");
const Accounts = require('../data/helpers/accountsModel');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Accounts.get();
    res.status(200).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateId, async (req, res, next) => {
  try {
    res.status(200).json(req.account);
  } catch (err) {
    next(err);
  }
});

router.post("/", validateBody, async (req, res, next) => {
  try {
    const newAccount = await Accounts.insert(req.newAccount);

    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateId, validateBody, async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.update(req.params.id, req.newAccount);
    res.status(200).json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateId, (req, res) => {
  res.json("/api/accounts/del");
});

// validateID middleware
async function validateId(req, res, next) {
  const { id } = req.params;
  if (Number.isInteger(parseInt(id, 10))) {
    try {
      const account = await Accounts.getAccountById(id);
      if (account) {
        req.account = account;
        next();
      } else {
        res
          .status(404)
          .json({ message: `The account with Id of '${id}' does not exist` });
      }
    } catch (err) {
      next(err);
    }
  } else {
    res.status(400).json({ message: `The Id of '${id}' is not valid` });
  }
}

// validateBody middleware
function validateBody(req, res, next) {
  const { name, budget } = req.body;

  if (Object.keys(req.body).length === 0)
    res.status(400).json({ message: "Missing account data" });
  if (!name || !budget || budget < 0)
    res
      .status(400)
      .json({ message: "Missing or incorrect required name or budget data" });

  req.newAccount = { name, budget };
  next();
}

module.exports = router;