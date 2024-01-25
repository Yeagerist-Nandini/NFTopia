import axios from 'axios'
const FormData = require('form-data')
// require('dotenv').config();

const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const JWT = process.env.REACT_APP_JWT;
let cnt1=1;

export const uploadFileToIPFS = async (file) => {
    let data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: `${cnt1}.webp`,
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'Authorization': `Bearer ${JWT}`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        });
        
        cnt1++;
        console.log(res.data);
        return {
            success: true,
            pinataURL: "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        }
    }
}

export const uploadJSONToIPFS = async (name, description, price, url) => {
    try {
        const data = JSON.stringify({
            NFTopiaContent: {
                name: `${name}`,
                description: `${description}`,
                price: `${price}`,
                image: `${url}`,
            },
            NFTopiaMetadata: {
                name: "NFTopia Metadata",
            },
        });

        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            },
            body: data
        });

        const resData = await res.json();

        console.log("Metadata uploaded, CID:", resData.IpfsHash);
        return {
            success: true,
            pinataURL: "https://gateway.pinata.cloud/ipfs/" + resData.IpfsHash,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error.message,
        }
    }
}
