import axios from 'axios';

const privateKey = process.env.SERVER_AUTH_KEY || 'default_key';
const APPROVE_SERVICE_BASE_URL = process.env.APPROVE_SYSTEM_BASE_URL || 'localhost:9090/';

async function approveApplication(appID: string) {
  try {
    const res = await axios.put(APPROVE_SERVICE_BASE_URL, {
      appID
    },
      {
        headers: {
          'X-server-auth-key': privateKey
        }
      });
    console.log('Application approved', res);
    return res.data;
  } catch (err) {
    console.log('Application rejected', err);
    return null;
  }
}


export default { approveApplication }