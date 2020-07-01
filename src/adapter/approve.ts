import axios from 'axios';

const APPROVE_SERVICE_BASE_URL = process.env.APPROVE_SYSTEM_BASE_URL || 'localhost:9090/'

async function approveApplication(appID: string) {
  try {
    let res = await axios.post(APPROVE_SERVICE_BASE_URL, {
      appID
    });
    console.log('Application approved', res);
  } catch (err) {
    console.log('Application rejected', err);
  }
}


export default { approveApplication }