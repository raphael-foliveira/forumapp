import express from 'express';
import { memberController } from '../controllers';
import { useHandler } from './use-handler';

const memberRouter = express.Router();

memberRouter.post('/', useHandler(memberController.addMember));

export default memberRouter;
