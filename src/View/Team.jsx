import '../assets/style/Team.scss'
import TeamImg from '../assets/image/TeamImg.png'
import dian from '../assets/image/diandian.png'
import Teamjiantou from '../assets/image/Teamjiantou.png'
export default function Team() {
  return (
    <div className="Team">
      <div className="Title">Founder&CEO</div>
      <div className="Introduction">
        <div className="imgBox">
          <div className="block"></div>
          <img src={TeamImg} alt="" />
          <img className="dian" src={dian} alt="" />
        </div>
        <div className="Line"></div>
      Michael is an Australian finance expert and cryptocurrency enthusiast with over 6 years of experience in the industry. He possesses a strong understanding of blockchain technology and its application in the financial sector. Currently, Michael is leading the talented team at LiftedStake, a blockchain company, towards their core vision.<br></br><br></br>
      Having studied finance at Curtin University, Michael recognized the power of smart contract blockchains and their potential to address the issues of opacity and inequality in traditional finance. This realization motivated him to focus his career on innovating with blockchain technology and driving transparency and fairness within the industry.<br></br><br></br>
      As the Founder and CEO of LiftedStake, Michael is dedicated to revolutionizing the financial sector through the development of innovative blockchain solutions. His expertise in financial analysis, cryptocurrency market insights, and team leadership positions him to effectively guide the team towards achieving their mission.
      <div className="separate">
        <img src={Teamjiantou} alt="" />Other team members: <div className="line"></div>
      </div>
      Liftedbit boasts a world-class team of finance and technology experts who are revolutionizing the industry. With backgrounds in top global investment banks and a track record of serving leading financial institutions and hedge funds, our team brings unparalleled expertise to the table.<br></br><br></br>

      Our team members have a strong background in companies like Google and Meta, and they have played pivotal roles in servicing DeFi protocols with Total Value Locked (TVL) exceeding 100m+. This impressive achievement showcases their ability to navigate complex financial ecosystems and deliver results.<br></br><br></br>

      At Liftedbit, we leverage cutting-edge quantitative models to cover valuation, trading, and risk management. Our focus on superior hedging operations ensures optimal user benefits and safeguards their interests. Join us as we redefine the future of finance with Liftedbit, where exceptional talent meets groundbreaking technology.
      </div>
    </div>
  )
}
