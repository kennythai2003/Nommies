import "../styles/landing.css"
import SignInModal from "./SignInModal.js"
import React, { useState } from "react"

function Landing() {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showSignInModal = () => {
        setIsModalVisible(true)
    }

    return (
        <div className="main-container">
            <div className="section__container header__container" id="home">
                <div className="header__image">
                    <img src="pancakes.gif" alt="header" />
                </div>
                <div className="header__content">
                    <h1>
                        nommies <br />
                        <span>meet, eat, & enjoy</span>
                    </h1>
                    <p className="section__description">
                        {/* Discover the true essence of culinary delight as you meet, eat, and savor the authentic flavors that define our passion for food. */}
                    </p>
                    <div className="header__btn">
                        <button
                            className="btn"
                            type="button"
                            onClick={showSignInModal}
                        >
                            <p> sign in </p>
                            <div>
                                {isModalVisible && (
                                    <SignInModal
                                        setIsModalVisible={setIsModalVisible}
                                    />
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <section
                className="section__container special__container"
                id="special"
            >
                <div className="quickbox">
                    <h2 className="section__header">Our Mission</h2>
                    <p className="section__description">
                        Enjoy culinary delight as you meet, eat, and savor with
                        the nommies community.
                    </p>
                </div>
                <div className="special__grid">
                    <div className="special__card">
                        <img src="special-1.png" alt="special" />
                        <h4>Discover</h4>
                        <p>
                            Search your area for trending restaurants and
                            comfort your cravings.
                        </p>
                    </div>
                    <div className="special__card">
                        <img src="special-2.png" alt="special" />
                        <h4>Share</h4>
                        <p>See recent restaurants your friends have visited.</p>
                    </div>
                    <div className="special__card">
                        <img src="special-3.png" alt="special" />
                        <h4>Review</h4>
                        <p>
                            Discuss what you love and hate, was that food really
                            bussin?
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Landing
