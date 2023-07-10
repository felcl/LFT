import '../assets/style/Slippage.scss'
import classnames from 'classnames';
import { Switch } from 'antd';
import { useDispatch } from "react-redux";
import { useNavigate} from 'react-router-dom'
import JTReturn from '../assets/image/JTReturn.png'
import { useState, useRef, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'
export default function Slippage() {
    const { t } = useTranslation()
    const slippage = useSelector(Store =>Store.slippage)
    const navigate = useNavigate();
    const [ ActiveTabIndex, setActiveTabIndex] = useState(-1)
    const [ inputSlippage, setInputSlippage] = useState('')
    const ActiveTabRef = useRef()
    const defaultActiveTabRef = useRef()
    const parent = useRef()
    const dispatch = useDispatch()
    const slippageMap = [0.3,1,3]
    const changeTab = (event,index,slippage)=>{
        // console.log(event.target)
        // console.log(event.target.clientWidth)
        // console.log(event.target.offsetLeft)
        // console.log(ActiveTabRef.current)
        dispatch({
            type:'SETSLIPPAGE',
            slippage
        })
        setInputSlippage('')
        setActiveTabIndex(index)
        ActiveTabRef.current.style.width = event.target.clientWidth + 'px'
        ActiveTabRef.current.style.height = event.target.clientHeight + 'px'
        ActiveTabRef.current.style.left = event.target.offsetLeft + 'px'
    }
    useEffect(()=>{
        console.log()
        let Index = slippageMap.findIndex(item=>{
            return item === slippage
        })
        if(Index === -1){
            Index = 0
            setInputSlippage(slippage)
        }
        setActiveTabIndex(Index)
        ActiveTabRef.current.style.width = parent.current.childNodes[Index].clientWidth + 'px'
        ActiveTabRef.current.style.height = parent.current.childNodes[Index].clientHeight + 'px'
        ActiveTabRef.current.style.left = parent.current.childNodes[Index].offsetLeft + 'px'
    },[])
    const Reset = () => {
        dispatch({
            type:'SETSLIPPAGE',
            slippage:0.3
        })
        setActiveTabIndex(0)
        setInputSlippage('')
        ActiveTabRef.current.style.width = parent.current.childNodes[0].clientWidth + 'px'
        ActiveTabRef.current.style.height = parent.current.childNodes[0].clientHeight + 'px'
        ActiveTabRef.current.style.left = parent.current.childNodes[0].offsetLeft + 'px'
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
        setInputSlippage(putVal)
        if(!putVal){
            dispatch({
                type:'SETSLIPPAGE',
                slippage:slippageMap[ActiveTabIndex]
            })
        }else{
            dispatch({
                type:'SETSLIPPAGE',
                slippage:putVal
            })
        }
    }
  return (
    <div className="Slippage">
        <div className="Title">{t('Swap')}</div>
        <div className="SlippageBox">
            <div className="SlippageHeader">
                <img src={JTReturn} onClick={()=>{navigate(-1)}} alt="" />
                <span className='HeaderTitle'>{t('AdvancedSettings')}</span>
                <span className='Reset' onClick={Reset}>{t('Reset')}</span>
            </div>
            <div className="SlippageLabel">{t('SlippageTolerance')}</div>
            <div className="SlippageSubLabel">{t('Yourtransactionwillrevert')}<br></br>{t('Yourtransactionwillrevert2')}</div>
            <div className='percentageRow'>
                <div className="percentageTab" ref={parent}>
                    <div className={classnames(['TabItem','flexCenter'])} ref={defaultActiveTabRef} onClick={(event)=>{changeTab(event,0,0.3)}}>0.3%</div>
                    <div className={classnames(['TabItem','flexCenter'])} onClick={(event)=>{changeTab(event,1,1)}}>1%</div>
                    <div className={classnames(['TabItem','flexCenter'])} onClick={(event)=>{changeTab(event,2,3)}}>3%</div>
                    <div className={classnames(['ActiveTab',{'Disabled':!!inputSlippage}])} ref={ActiveTabRef}></div>
                </div>
                <div className="percentagePut flexCenter">
                    <input type="text" value={inputSlippage} onChange={(e)=>changeNumPut(e.target.value)} />
                    %
                </div>
            </div>
            {/* <div className="switchLabel">{t('LFTswapreceive')} </div>
            <Switch defaultChecked className='percentageSwitch' /> */}
        </div>
    </div>
  )
}
