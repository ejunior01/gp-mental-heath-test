import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultLayout } from "@/view/layouts/default-layout";
import { SurveyPage } from "@/view/pages/Survey";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<SurveyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
