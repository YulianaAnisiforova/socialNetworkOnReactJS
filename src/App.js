import './App.css'

const App = () => {
  return (
    <div className='appWrapper'>
      <header className='header'>
        <img src="https://static.vecteezy.com/system/resources/previews/012/986/755/non_2x/abstract-circle-logo-icon-free-png.png" alt="logo"/>
      </header>
      <nav className='nav'>
        <div>
            <a> Profile </a>
        </div>
        <div>
            <a> Messages </a>
        </div>
        <div>
            <a> News </a>
        </div>
        <div>
            <a> Music </a>
        </div>
        <div>
            <a> Settings </a>
        </div>
      </nav>
      <div className='content'>
          <div>
            <img src="https://png.pngtree.com/png-vector/20220924/ourmid/pngtree-welcome-transparent-text-png-image_238532.png" alt="welcome"/>
          </div>
          <div>
              <img src="https://wallpapers.com/images/hd/mabel-pines-phone-chat-gravity-falls-9szwl6nu2g195bxn.jpg" alt="mabel"/>
          </div>
          <div>
              my posts
              <div>
                  new post
              </div>
              <div>
                  <div>post1</div>
                  <div>post2</div>
                  <div>post3</div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default App
