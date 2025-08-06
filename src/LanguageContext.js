import { createContext,useState } from "react";
import ar from "./locales/ar";
import en from "./locales/en";
export const LangContext = createContext();

export default function LanguageContext({children}){
const[language, setLanguage] = useState('en');
function changeLanguage(lng){
   lng==='en'? setLanguage('ar'):setLanguage('en');
}
const translation = language==='ar'? ar : en;
return(
    <LangContext.Provider value={{language,changeLanguage,translation}}>
{children}
    </LangContext.Provider>
)


}