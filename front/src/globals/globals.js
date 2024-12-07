import {
  IconRobot,
  IconMessage,
  IconMail,
  IconCalendar,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export const API_URL = "http://localhost:8080";
export const STRIPE_URL = "http://localhost:5051/";

export const useGlobals = () => {
  const { t } = useTranslation();

  const navigation = [
    { name: t("header.navigation.home"), href: "/" },
    { name: t("header.navigation.features"), href: "/#features" },
    { name: t("header.navigation.prices"), href: "/#prices" },
  ];

  const products = [
    {
      name: t("products.chatbot.name"),
      href: "/chatbot",
      icon: IconRobot,
      description: t("products.chatbot.description"),
    },
    {
      name: t("products.livechat.name"),
      href: "/livechat",
      icon: IconMessage,
      description: t("products.livechat.description"),
    },
    {
      name: t("products.emailAutomation.name"),
      href: "/email-automation",
      icon: IconMail,
      description: t("products.emailAutomation.description"),
    },
    {
      name: t("products.meetingManager.name"),
      href: "/meeting-manager",
      icon: IconCalendar,
      description: t("products.meetingManager.description"),
    },
    {
      name: t("products.whatsappAPI.name"),
      href: "/whatsapp",
      icon: IconBrandWhatsapp,
      description: t("products.whatsappAPI.description"),
    },
  ];

  return { navigation, products };
};
