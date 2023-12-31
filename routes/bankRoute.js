import express from 'express';
import {
  addUser,
  depositCash,
  updateCredit,
  withdrawMoney,
  transferMoney,
  getUserDetails,
  getAllUsersDetails,
  filterByCash,
   filterByCredit
} from '../controllers/backController.js';

const router = express.Router();

// Route to add a new user to the bank
router.post('/users', addUser);

router.put('/users/deposit', depositCash);

router.put('/users/update-credit', updateCredit);

router.put('/users/withdraw', withdrawMoney);

router.put('/users/transfer', transferMoney);

router.get('/users/:ID', getUserDetails);

router.get('/users', getAllUsersDetails);

router.get('/filter/cash/:minAmount/:maxAmount', filterByCash);

router.get('/filter/credit/:minCredit/:maxCredit', filterByCredit);

export default router;
