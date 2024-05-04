import './home.css'
import Header from '../../Components/header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import Featured from '../../Components/featured/Featured'
import PropertyList from '../../Components/propertyList/PropertyList'
import PropertyFeatured from '../../Components/propertyFeatured/PropertyFeatured'
import MailList from '../../Components/mailList/MailList'
import Footer from '../../Components/footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className='homeTitle'>Browse my property type</h1>
        <PropertyList/>
        <h1 className='homeTitle'>Homes guests love</h1>
        <PropertyFeatured/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
