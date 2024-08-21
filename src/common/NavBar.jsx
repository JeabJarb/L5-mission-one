import style from "./NavBar.module.css"

function NavBar() {
  return (
    <div className={style.background}>
        <nav className={style.quickNav}>
            <p>Cars</p>
            <p>Turners Subscription</p>
            <p>Trucks & Machinery</p>
            <p>Damage & End of Life</p>
            <p>Motorcycles</p>
            <p>General Goods</p>
            <p>Buses, Caravans & Motorhomes</p>
        </nav>
        <div className={style.loginSection}>
            <img src="./turnerscars-logo.png" alt="logo" />
            <div className={style.loginContainer}>
                <div className={style.loginRegister}>
                    <p>LOGIN</p>
                    <p className={style.orLogin}>OR</p>
                    <p>REGISTER</p>
                </div>
                <p>0800 887 637</p>
                <p>Find Us</p>
                <p className={style.chineseLang}>中文</p>
            </div>
        </div>
        <nav className={style.navBar}>
            <div className={style.navBarContainer}>
                <p>Find a Car</p>
                <p>How to Buy</p>
                <p>Sell your Car</p>
                <p>Finance & Insurance</p>
                <p>Turners Subscription</p>
            </div>
            <div className={style.navBarContainer}>
                <p>Auctions</p>
                <p>Service & Info</p>
            </div>
            
        </nav>
    </div>
  )
}
export default NavBar