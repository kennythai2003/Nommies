import React, { createContext, useState } from "react"

const AppContext = createContext()

const AppContextProvider = (props) => {
	const [modalVisible, setModalVisible] = useState(false)

	return (
		<AppContext.Provider value={{ modalVisible, setModalVisible }}>
			{props.children}
		</AppContext.Provider>
	)
}

export default AppContext
export { AppContextProvider }
