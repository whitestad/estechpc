import './App.css'
import './assets/global.css'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainWrapper from "@/layouts/MainWrapper.jsx";
import {Header} from "@components/layout/header/Header.jsx";
import MainPage from "@/pages/MainPage.jsx";
import ComponentDemonstration from "@/pages/ComponentDemonstration.jsx";
import Logout from "@/pages/Logout.jsx";
import Login from "@/pages/Login.jsx";
import CategoriesPage from "@/pages/CategoriesPage.jsx";
import ProductsPage from "@/pages/ProductsPage.jsx";

function App() {

    return (
        <BrowserRouter>
            <MainWrapper>
                <Header></Header>
                <Routes>
                    <Route path="/" element={<MainPage></MainPage> } />

                    <Route path="/categories" element={<CategoriesPage></CategoriesPage> } />

                    <Route path="/products" element={<ProductsPage />} />

                    <Route path="/component-demonstration" element={<ComponentDemonstration></ComponentDemonstration> } />
                    <Route path="/login" element={<Login/> } />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </MainWrapper>
        </BrowserRouter>
    )
}

export default App
