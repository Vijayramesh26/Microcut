<template>
  <v-app :theme="themeName">
    <!-- Navigation Glass Bar -->
    <Navbar @toggle-theme="toggleTheme" />

    <!-- Main Content Grid -->
    <v-main>
      <!-- Standard Visitor Sections -->
      <HeroSection />

      <CountersBar />

      <AboutSection />

      <!-- <OrgChartSection /> -->

      <MachinerySection />

      <MaterialsSection />

      <GallerySection />

      <!-- <WorkflowSection /> -->

      <!-- <QualityObjectives /> -->

      <CustomersSection />

      <TestimonialSection />

      <QuoteEstimator @submit-quote="handleNewQuote" />

      <FaqSection />

      <ContactSection />
    </v-main>

    <!-- Floating WhatsApp Widget -->
    <FloatingContact />

    <!-- Unified Corporate Footer -->
    <Footer />
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

// Component Imports
import Navbar from "./components/Navbar.vue";
import HeroSection from "./components/HeroSection.vue";
import CountersBar from "./components/CountersBar.vue";
import AboutSection from "./components/AboutSection.vue";
import OrgChartSection from "./components/OrgChartSection.vue";
import MachinerySection from "./components/MachinerySection.vue";
import MaterialsSection from "./components/MaterialsSection.vue";
import GallerySection from "./components/GallerySection.vue";
import WorkflowSection from "./components/WorkflowSection.vue";
import QualityObjectives from "./components/QualityObjectives.vue";
import CustomersSection from "./components/CustomersSection.vue";
import TestimonialSection from "./components/TestimonialSection.vue";
import QuoteEstimator from "./components/QuoteEstimator.vue";
import FaqSection from "./components/FaqSection.vue";
import ContactSection from "./components/ContactSection.vue";
import Footer from "./components/Footer.vue";
import FloatingContact from "./components/FloatingContact.vue";

const theme = useTheme();
const themeName = ref("light");
const latestQuote = ref(null);

const toggleTheme = () => {
  themeName.value = themeName.value === "light" ? "dark" : "light";
  theme.global.name.value = themeName.value;
};

const handleNewQuote = (payload) => {
  latestQuote.value = payload;
};
</script>

<style>
/* Global style rules (if any, although already covered in style.css) */
</style>
