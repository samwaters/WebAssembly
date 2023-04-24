import * as React from "react"
import { Route, Routes } from "react-router-dom"
import { Addition } from "components/addition";

export const Projects = () => (<Routes>
	<Route path="/" element={<>HOME</>} />
	<Route path="/addition" element={<Addition />} />
	<Route path="/prime" element={<>PRIME</>} />
</Routes>)