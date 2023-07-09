import {useNavigate} from 'react-router-dom'
import Axios from '../axios'
import { NumSplic } from '../utils/tool'
import '../assets/style/Convert.scss'
import ConvertJt from '../assets/image/ConvertJt.png'
import ELFTIcon from '../assets/image/ELFTIcon.png'
import LFTIcon from '../assets/image/LFTIcon.png'
import { useEffect, useState } from 'react'
import { notification } from 'antd';
import { useSelector } from "react-redux";
import BigNumber from 'big.js'
import { useTranslation } from 'react-i18next'

export default function Convert() {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const [amount,setAmount] = useState(0)
    const [price,setPrice] = useState(0)
    const [fee,setFee] = useState(0)
    const [fromValue,setFromValue] = useState('')
    const [toValue,setToValue] = useState('')
    const Token = useSelector(Store =>Store.token)
    // const [BaseInfo]
    // useState(null)
    const exchange = ()=>{
        if(!Token){
            return notification.warning({
                message: 'Warning',
                description: t('pleaselogin')
            });
        }
        if(!price){
            return notification.warning({
                message: 'Warning',
                description:t('Pleasetryagain')
            });
        }
        if(!fromValue){
            return notification.warning({
                message: 'Warning',
                description: t('Pleaseenterthe2')
            });
        }
        if(new BigNumber(fromValue).lte(0)){
            notification.warning({
                message: 'Warning',
                description: t('Pleaseenterthe2')
            });
        }
        if(new BigNumber(fromValue).gt(amount)){
            return notification.warning({
                message: 'Warning',
                description: t('Insufficientbalance')
            });
        }
        Axios.post('/swap/exchange',{
            coin:"ELFT",
            toCoin:"LFT",
            exchangeNumber:fromValue
        }).then(res=>{
            if(res.data.code === 200){
                return notification.success({
                    message: 'Success',
                    description: t('successfulexchange')
                });
            }else{
                return notification.error({
                    message: 'Error',
                    description: res.data.msg
                });
            }
        },()=>{
            return notification.error({
                message: 'Error',
                description: t('Exchangefailed')
            });
        })
    }
    const submitRunder = ()=>{
        if(!price || !Token){
            return 'submit flexCenter Disable'
        }
        if(!fromValue){
            return 'submit flexCenter Disable'
        }
        if(new BigNumber(fromValue).gt(amount)){
            return 'submit flexCenter Disable'
        }
        return 'submit flexCenter'
    }
    const changeNumPut = (value, accuracy)=>{
        if (/^\./g.test(value)) {
          value = "0" + value;
        }
        let putVal = value.replace(/[^\d.]/g, "");
        if(putVal.split('.').length>2){
          putVal = [putVal.split('.')[0],putVal.split('.').slice(1,3).join('')].join('.')
        }
        if (accuracy !== undefined) {
          let putArr = putVal.split(".");
          if (putArr[1] && putArr[1].length > accuracy) {
            putArr[1] = putArr[1].slice(0, accuracy);
          }
          putVal = putArr.join(".");
        }
        return putVal;
    }
    const changeFromValue = (e)=>{
        let putValue = changeNumPut(typeof e === 'object' ? e.target.value : e+'')
        setFromValue(putValue)
        setToValue(NumSplic(putValue * (1-fee) * price , 6))
    }
    const changeToValue = (e)=>{
        let putValue = changeNumPut(e.target.value)
        setToValue(putValue)
        setFromValue(NumSplic(putValue / (1-fee) / price , 6))
    }
    useEffect(()=>{
        Axios.get('/swap/exchangeBase').then(res=>{
            if(res.data.code === 200){
                res.data.data.forEach(item=>{
                    if(item.coin === 'ELFT'){
                        setAmount(item.coinAmount)
                        item.eexchangeCoins.forEach(exchangeItem => {
                            if(exchangeItem.toCoin === 'LFT'){
                                setPrice(exchangeItem.price)
                                setFee(exchangeItem.fee)
                            }
                        })
                    }
                })
            }
            console.log(res,"交易基础信息")
        })
    },[])
    return (
        <div className="Convert">
            <div className="Title">{t('Convert1')}</div>
            <div className="ConvertBox">
                <div className="label">{t('From')}</div>
                <div className='JtPosition'>
                <img className='ConvertJt' src={ConvertJt} alt="" />
                <div className="put">
                    <input type="text" value={fromValue} onChange={changeFromValue} />
                    <span className="Max" onClick={()=>{changeFromValue(amount)}}>{t('MAX')}</span>
                    <div className='TokenInfo flexCenter'>
                        <img src={ELFTIcon} alt="" />
                        eLFT
                    </div>
                </div>
                <div className="label">{t('To')}</div>
                <div className="put">
                    <input type="text" value={toValue} onChange={changeToValue} />
                    <div className='TokenInfo flexCenter'>
                        <img src={LFTIcon} alt="" />
                        LFT
                    </div>
                </div>
                </div>
                {
                    fee !==0 && <div className="ServiceCharge"> {t('Servicecharge')}：{fee * 100}% </div>
                }
                <div className={submitRunder()} onClick={exchange}>{t('Confirm')}</div>
            </div>
            <div className="goRecord" onClick={()=>{navigate('/ConvertRecord')}}>
                {t('Convertrecord') + ' >'}
            </div>
        </div>
    )
}
