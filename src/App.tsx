import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Shell } from "./components/layout/Shell"
import { About } from "./pages/About"
import { Animation } from "./pages/Animation"
import { AnimationDetail } from "./pages/AnimationDetail"
import { Artwork } from "./pages/Artwork"
import { Home } from "./pages/Home"
import { Illustration } from "./pages/Illustration"
import { NotFound } from "./pages/NotFound"
import { Release } from "./pages/Release"
import { Talent } from "./pages/Talent"
import { Vsinger } from "./pages/Vsinger"

export function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<Home />} />
            <Route path="vsinger" element={<Vsinger />} />
            <Route path="vsinger/release/:slug" element={<Release />} />
            <Route path="vsinger/:slug" element={<Talent />} />
            <Route path="illustration" element={<Illustration />} />
            <Route path="illustration/:slug" element={<Artwork />} />
            <Route path="animation" element={<Animation />} />
            <Route path="animation/:slug" element={<AnimationDetail />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
