import { useTranslation } from "react-i18next";

const useLanguages = (value) => {
    const { t, i18n, ready } = useTranslation();
    return t(value)
}

export default useLanguages;