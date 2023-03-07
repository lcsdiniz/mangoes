import { Header } from "../components/Header/Header";
import { Outlet } from "react-router-dom";

export function Layout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}