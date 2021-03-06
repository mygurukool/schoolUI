import { useTranslation } from "react-i18next";

const useLanguages = () => {
    const { t, i18n, ready } = useTranslation();
    const translate = (value) => {
        return t(value)
    }
    return translate
}

export default useLanguages;