<template>
  <section id="faq" class="py-16 px-4 bg-surface" style="border-top: 1px solid rgba(143, 166, 180, 0.1);">
    <v-container>
      <v-row class="align-center">
        <!-- Left Side: Title and Contact Box -->
        <v-col cols="12" md="5" class="pr-md-8 mb-8 mb-md-0 fade-right" v-animate>
          <v-chip color="secondary" variant="flat" size="small" class="font-weight-black mb-4 tracking-widest text-uppercase">
            Support & Inquiries
          </v-chip>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-primary mb-4">Frequently<br>Asked Questions</h2>
          <p class="text-body-1 text-grey-darken-1 mb-8 leading-relaxed">
            Find quick answers to some of the most common questions about our machinery, capacity, and material handling capabilities. We believe in complete transparency.
          </p>

          <v-card flat class="pa-6 rounded-xl border bg-background text-center d-flex flex-column align-center hover-scale" style="border-color: rgba(143, 166, 180, 0.2) !important;">
            <v-avatar color="rgba(50, 140, 193, 0.1)" size="64" class="mb-4">
              <v-icon color="secondary" size="32">mdi-account-question-outline</v-icon>
            </v-avatar>
            <h4 class="text-h6 font-weight-black text-primary mb-2">Still have questions?</h4>
            <p class="text-body-2 text-grey-darken-1 mb-6">Our team is ready to provide specific answers for your custom machining requirements.</p>
            <v-btn
              color="success"
              variant="flat"
              class="font-weight-bold text-none rounded-lg px-6"
              href="https://wa.me/919677284841"
              target="_blank"
            >
              <v-icon start>mdi-whatsapp</v-icon>
              Chat with us
            </v-btn>
          </v-card>
        </v-col>

        <!-- Right Side: FAQ Accordion -->
        <v-col cols="12" md="7" class="fade-left" v-animate>
          <v-expansion-panels variant="popout" class="custom-panels">
            <v-expansion-panel
              v-for="(item, i) in faqs"
              :key="i"
              class="mb-3 rounded-xl border elevation-0"
              style="border-color: rgba(143, 166, 180, 0.2) !important; overflow: hidden;"
            >
              <v-expansion-panel-title class="text-body-1 font-weight-bold text-primary py-4">
                <div class="d-flex align-start">
                  <v-icon color="secondary" size="20" class="mr-3 mt-0.5">mdi-help-circle-outline</v-icon>
                  {{ item.question }}
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text class="text-body-2 text-grey-darken-2 pb-2 leading-relaxed pl-8">
                {{ item.answer }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'FaqSection',
  setup() {
    const faqs = [
      {
        question: "What is your maximum cutting capacity?",
        answer: "Our heavy-duty bandsaw machines can comfortably cut steel rods and pipes up to 330mm in diameter, maintaining high precision and smooth finishes across all grades of steel."
      },
      {
        question: "Do you provide material handling facilities?",
        answer: "Yes! We have an inbuilt 2-Ton overhead crane facility. You just need to bring in your raw material bundles, and our team will safely unload, shift, and load them onto the cutting machines."
      },
      {
        question: "What is your typical turnaround time?",
        answer: "Turnaround time depends on the volume and specifications of the order. However, we pride ourselves on our 'On-Time Delivery' commitment. Most standard rod cutting jobs are processed and dispatched within 24 to 48 hours."
      },
      {
        question: "Are you MSME registered?",
        answer: "Yes, Microcut Engineering is a fully certified MSME registered partnership unit operating since 2019. We adhere to standard industrial compliance and quality assurance norms."
      },
      {
        question: "How do I get an exact quote for my project?",
        answer: "You can use the 'Cost Estimator' tool on our website for an instant rough estimate, or you can message us directly on WhatsApp or email with your specific dimensions and material grade for a formal quotation."
      }
    ]

    return {
      faqs
    }
  }
}
</script>

<style scoped>
.max-width-lg {
  max-width: 900px;
}
.max-width-md {
  max-width: 600px;
}
.leading-relaxed {
  line-height: 1.625;
}

/* Custom spacing for popout panels */
.custom-panels :deep(.v-expansion-panel) {
  transition: transform 0.2s, box-shadow 0.2s;
}
.custom-panels :deep(.v-expansion-panel--active) {
  box-shadow: 0 4px 20px rgba(11, 60, 93, 0.08) !important;
  border-color: rgba(50, 140, 193, 0.4) !important;
}
.custom-panels :deep(.v-expansion-panel::after) {
  display: none !important;
}
</style>
