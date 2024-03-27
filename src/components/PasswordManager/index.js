import {Component} from 'react'
import {v4} from 'uuid'
import './index.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class PasswordManager extends Component {
  state = {
    isTrue: false,
    latestList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  onAddContent = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website[0].toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]

    const newValues = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      passwordInput: password,
      classAdd: classValue,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onDeleteItem = id => {
    const {latestList} = this.state
    const filteredList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = filteredList.length !== 0
    this.setState({latestList: filteredList, isTrue: caseOf})
  }

  render() {
    const {website, username, password, latestList, isShow, searchInput} =
      this.state
    let {isTrue} = this.state

    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
          className="app-logo"
        />
        <div className="password-mng-container">
          <form className="password-container" onSubmit={this.onAddContent}>
            <h1 className="heading">Add New Password</h1>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="icon"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="icon"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="icon"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="add-btn-container">
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-img-lg"
          />

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
            alt="password manager"
            className="password-img-sm"
          />
        </div>

        <div className="output-container">
          <div className="passwords-count-container">
            <dvi className="heading-count">
              <h1 className="heading">Your Passwords</h1>
              <p className="count">{newList.length}</p>
            </dvi>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox"
              id="checkboxId"
              onChange={this.showPassword}
            />
            <label htmlFor="checkboxId" className="checkbox-label">
              Show Passwords
            </label>
          </div>

          {!isTrue && (
            <div className="no-passwords-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-img"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          )}

          {isTrue && (
            <ul className="password-list-container">
              {newList.map(eachValue => (
                <li
                  className="password-item"
                  id={eachValue.id}
                  key={eachValue.id}
                >
                  <div className="add-input">
                    <p className={`initial ${eachValue.classAdd}`}>
                      {eachValue.initialValue}
                    </p>
                    <div>
                      <p className="input-item">{eachValue.websiteName}</p>
                      <p className="input-item">{eachValue.userName}</p>

                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="stars-img"
                        />
                      )}
                      {isShow && (
                        <p className="input-item">{eachValue.passwordInput}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="delete-btn"
                      data-testid="delete"
                      onClick={() => this.onDeleteItem(eachValue.id)}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="delete-icon"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
