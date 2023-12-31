import { v4 as uuidv4 } from 'uuid';
import { readUsersFromFile, writeUsersToFile } from '../models/backModel.js'; 

let users = readUsersFromFile(); 

const addUser = (req, res) => {
  
  const { name, cash = 0, credit = 0 } = req.body;
  
  // if (!name) {
  //   return res.status(400).json({ message: 'Name is required' });
  // }
  
  const newUser = {
    ID: uuidv4(),
    name,
    cash,
    credit
  };
console.log(newUser)
  users.push(newUser);
  writeUsersToFile(users); 
  res.status(201).json({ message: 'User added successfully', user: newUser});
};



const depositCash = (req, res) => {
  const { ID, amount } = req.body;
  const user = users.find(user => user.ID === ID);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.cash += amount;
  writeUsersToFile(users);
  res.status(200).json({ message: 'Cash deposited successfully', user });
};

const updateCredit = (req, res) => {
  const { ID, creditAmount } = req.body;
  const user = users.find(user => user.ID === ID);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (creditAmount < 0) {
    return res.status(400).json({ message: 'Credit amount should be a positive number' });
  }

  user.credit = creditAmount;
  writeUsersToFile(users); 
  res.status(200).json({ message: 'Credit updated successfully', user });
};


const withdrawMoney = (req, res) => {
  const { ID, amount } = req.body;
  const user = users.find(user => user.ID === ID);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const totalAvailable = user.cash + user.credit;
  if (totalAvailable < amount) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }

  if (user.cash >= amount) {
    user.cash -= amount;
  } else {
    const remainingCredit = amount - user.cash;
    user.cash = 0;
    user.credit -= remainingCredit;
  }

  writeUsersToFile(users); 
  res.status(200).json({ message: 'Money withdrawn successfully', user });
};

const transferMoney = (req, res) => {
  const { fromID, toID, amount } = req.body;
  const fromUser = users.find(user => user.ID === fromID);
  const toUser = users.find(user => user.ID === toID);
  if (!fromUser || !toUser) {
    return res.status(404).json({ message: 'User(s) not found' });
  }

  const totalAvailable = fromUser.cash + fromUser.credit;
  if (totalAvailable < amount) {
    return res.status(400).json({ message: 'Insufficient funds' });
  }

  if (fromUser.cash >= amount) {
    fromUser.cash -= amount;
    toUser.cash += amount;
  } else {
    const remainingCredit = amount - fromUser.cash;
    fromUser.cash = 0;
    if (fromUser.credit >= remainingCredit) {
      fromUser.credit -= remainingCredit;
      toUser.cash += amount;
    } else {
      return res.status(400).json({ message: 'Cannot transfer: Insufficient credit' });
    }
  }

  writeUsersToFile(users); // Write updated users data to the file
  res.status(200).json({ message: 'Money transferred successfully', fromUser, toUser });
};


const getUserDetails = (req, res) => {
  const { ID } = req.params;
  const user = users.find(user => user.ID === ID);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ user });
};


const getAllUsersDetails = (req, res) => {
  res.status(200).json({ users });
};


const filterByCash = (req, res) => {
  console.log(req.params)
  const { minAmount, maxAmount } = req.params;
  const filteredUsers = users.filter(user => user.cash >= parseInt(minAmount) && user.cash <= parseInt(maxAmount));
  console.log(filteredUsers)

  res.json({ users: filteredUsers });
};

const filterByCredit = (req, res) => {
  const { minCredit, maxCredit } = req.params;
  const filteredUsers = users.filter(user => user.credit >= parseInt(minCredit) && user.credit <= parseInt(maxCredit));
  console.log(filteredUsers)
  res.json({ users: filteredUsers });
};


 export {
  addUser,
  depositCash,
  updateCredit,
  withdrawMoney,
  transferMoney,
  getUserDetails,
  getAllUsersDetails,
  filterByCash,
  filterByCredit,
};
