<template>
  <section id="contact" class="py-16 px-4 bg-background">
    <v-container>
      <!-- Section Header -->
      <v-row class="justify-center mb-12">
        <v-col cols="12" class="text-center fade-up" v-animate>
          <span class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">Get In Touch</span>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-primary mt-2">Contact Microcut Engineering</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
          <p class="text-body-2 text-grey-darken-1 mt-4 max-width-md mx-auto">
            Looking forward to your valuable support. Reach out to our managing partners directly or send us a quick email message.
          </p>
        </v-col>
      </v-row>

      <v-row class="align-stretch mb-8">
        <!-- Left Column: Partners Cards & Contact Details -->
        <v-col cols="12" lg="5" class="d-flex flex-column">
          <v-card flat class="pa-8 rounded-2xl border bg-surface flex-grow-1 d-flex flex-column fade-right delay-100" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important;">
            <h3 class="text-h5 font-weight-black text-primary mb-6 d-flex align-center">
              <v-icon color="secondary" class="mr-2">mdi-phone-in-talk-outline</v-icon>
              Managing Partners
            </h3>

            <div class="flex-grow-1 d-flex flex-column justify-center">
              <!-- Partner 1 -->
              <v-card flat class="pa-4 rounded-xl border bg-background mb-4 hover-scale d-flex align-center" style="border-color: rgba(143, 166, 180, 0.2) !important;">
                <v-avatar color="rgba(11, 60, 93, 0.1)" size="48" class="mr-4">
                  <v-icon color="primary" size="24">mdi-account-circle-outline</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="font-weight-black text-body-1 text-primary">Mr. Kishore</div>
                  <div class="text-caption text-secondary font-weight-medium">Managing Partner</div>
                  <div class="text-body-2 font-weight-bold text-grey-darken-2 mt-1">
                    <v-icon start size="16" color="primary">mdi-phone</v-icon>
                    +91 96772 84841
                  </div>
                </div>
                <div class="d-flex flex-column gap-y-1">
                  <v-btn icon="mdi-phone" href="tel:9677284841" target="_blank" rel="noopener noreferrer" color="primary" size="small" variant="flat"></v-btn>
                  <v-btn icon="mdi-whatsapp" href="https://wa.me/919677284841?text=Hello%20Microcut%20Engineering,%20I%20would%20like%20to%20inquire%20about%20your%20precision%20rod%20cutting%20and%20machining%20services." target="_blank" rel="noopener noreferrer" color="success" size="small" variant="flat" class="mt-1"></v-btn>
                </div>
              </v-card>

              <!-- Partner 2 -->
              <v-card flat class="pa-4 rounded-xl border bg-background mb-6 hover-scale d-flex align-center" style="border-color: rgba(143, 166, 180, 0.2) !important;">
                <v-avatar color="rgba(11, 60, 93, 0.1)" size="48" class="mr-4">
                  <v-icon color="primary" size="24">mdi-account-circle-outline</v-icon>
                </v-avatar>
                <div class="flex-grow-1">
                  <div class="font-weight-black text-body-1 text-primary">Mr. Santhosh Kumar</div>
                  <div class="text-caption text-secondary font-weight-medium">Managing Partner</div>
                  <div class="text-body-2 font-weight-bold text-grey-darken-2 mt-1">
                    <v-icon start size="16" color="primary">mdi-phone</v-icon>
                    +91 98401 58782
                  </div>
                </div>
                <div class="d-flex flex-column gap-y-1">
                  <v-btn icon="mdi-phone" href="tel:9840158782" target="_blank" rel="noopener noreferrer" color="primary" size="small" variant="flat"></v-btn>
                  <v-btn icon="mdi-whatsapp" href="https://wa.me/919840158782?text=Hello%20Microcut%20Engineering,%20I%20would%20like%20to%20inquire%20about%20your%20precision%20rod%20cutting%20and%20machining%20services." target="_blank" rel="noopener noreferrer" color="success" size="small" variant="flat" class="mt-1"></v-btn>
                </div>
              </v-card>

              <v-divider class="my-6" style="opacity: 0.5;"></v-divider>

              <!-- Email Card -->
              <v-card flat color="rgba(50, 140, 193, 0.08)" class="pa-4 rounded-xl border text-center hover-scale" style="border-color: rgba(50, 140, 193, 0.2) !important;">
                <v-icon color="secondary" size="28" class="mb-1">mdi-email-outline</v-icon>
                <div class="text-caption text-secondary font-weight-bold tracking-wide">OFFICIAL EMAIL</div>
                <a href="mailto:microcutengineerings@gmail.com" target="_blank" rel="noopener noreferrer" class="text-body-1 font-weight-black text-primary text-decoration-none mt-1 d-block" style="word-break: break-word; overflow-wrap: break-word;">
                  microcutengineerings<wbr>@gmail.com
                </a>
              </v-card>
            </div>
          </v-card>
        </v-col>

        <!-- Right Column: Interactive Email Contact Form -->
        <v-col cols="12" lg="7" class="d-flex flex-column">
          <v-card flat class="pa-8 rounded-2xl border bg-surface flex-grow-1 d-flex flex-column fade-left delay-200" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important;">
            <h3 class="text-h5 font-weight-black text-primary mb-2">Send Us A Message</h3>
            <p class="text-body-2 text-grey-darken-1 mb-6">Have questions or custom machining requirements? Drop us a line below and we'll reply within 24 hours.</p>

            <v-form ref="contactForm" v-model="contactValid">
              <v-row dense>
                <v-col cols="12" sm="6" class="py-1">
                  <v-text-field
                    v-model="msgForm.name"
                    label="FullName"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" class="py-1">
                  <v-text-field
                    v-model="msgForm.email"
                    label="Email Address"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    :rules="[rules.required, rules.email]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-text-field
                    v-model="msgForm.subject"
                    label="Subject"
                    variant="outlined"
                    density="comfortable"
                    color="primary"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-1">
                  <v-textarea
                    v-model="msgForm.message"
                    label="Your Message"
                    variant="outlined"
                    rows="6"
                    density="comfortable"
                    color="primary"
                    :rules="[rules.required]"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-btn
                block
                color="secondary"
                size="large"
                class="mt-6 font-weight-bold text-capitalize glow-btn rounded-lg"
                flat
                :disabled="!contactValid"
                @click="submitMessage"
              >
                <v-icon start>mdi-send</v-icon>
                Send Message
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>

      <!-- Bottom Row: Plant Locations Grid -->
      <v-row>
        <v-col cols="12">
          <h3 class="text-h5 font-weight-black text-primary mb-6 d-flex align-center">
            <v-icon color="secondary" class="mr-2">mdi-map-marker-multiple-outline</v-icon>
            Industrial Plant Locations
          </h3>
          
          <v-row>
            <v-col cols="12" md="6">
              <v-card flat class="pa-4 rounded-xl border bg-surface fill-height d-flex flex-column overflow-hidden fade-up delay-300" v-animate style="border-color: rgba(143, 166, 180, 0.2) !important; min-height: 350px;">
                <div class="mb-4 d-flex align-center justify-space-between">
                  <div>
                    <v-chip color="primary" variant="flat" size="small" class="font-weight-black mb-1">UNIT I</v-chip>
                    <div class="text-body-2 text-grey-darken-3 font-weight-medium leading-relaxed">
                      No. 147, NEW NO: 64 (NP), <br />
                      SIDCO Industrial Estate, Ambattur, Chennai : 600098
                    </div>
                  </div>
                  <v-icon size="36" color="rgba(11, 60, 93, 0.1)">mdi-factory</v-icon>
                </div>
                <div class="w-100 rounded-lg overflow-hidden flex-grow-1 border">
                  <iframe src="https://maps.google.com/maps?q=SIDCO%20Industrial%20Estate,%20Ambattur,%20Chennai&t=&z=14&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0; min-height: 250px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card flat class="pa-4 rounded-xl border bg-surface fill-height d-flex flex-column overflow-hidden" style="border-color: rgba(143, 166, 180, 0.2) !important; min-height: 350px;">
                <div class="mb-4 d-flex align-center justify-space-between">
                  <div>
                    <v-chip color="secondary" variant="flat" size="small" class="font-weight-black mb-1">UNIT II</v-chip>
                    <div class="text-body-2 text-grey-darken-3 font-weight-medium leading-relaxed">
                      No. 48B (NP), <br />
                      SIDCO Industrial Estate, Ambattur, Chennai : 600098
                    </div>
                  </div>
                  <v-icon size="36" color="rgba(11, 60, 93, 0.1)">mdi-factory</v-icon>
                </div>
                <div class="w-100 rounded-lg overflow-hidden flex-grow-1 border">
                  <iframe src="https://maps.google.com/maps?q=SIDCO%20Industrial%20Estate,%20Ambattur,%20Chennai&t=&z=14&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style="border:0; min-height: 250px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Success Snackbar -->
    <v-snackbar v-model="msgSnackbar" color="success" rounded="xl" timeout="3000">
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-check-circle</v-icon>
        <span>Message sent successfully! We will get back to you shortly.</span>
      </div>
    </v-snackbar>
  </section>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'ContactSection',
  setup() {
    const contactValid = ref(false)
    const msgSnackbar = ref(false)

    const msgForm = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const rules = {
      required: v => !!v || 'Field is required',
      email: v => /.+@.+\..+/.test(v) || 'Must be a valid email'
    }

    const contactForm = ref(null)

    const submitMessage = () => {
      if (contactForm.value.validate()) {
        msgSnackbar.value = true
        // Clear message fields
        msgForm.name = ''
        msgForm.email = ''
        msgForm.subject = ''
        msgForm.message = ''
      }
    }

    return {
      contactValid,
      msgSnackbar,
      msgForm,
      rules,
      contactForm,
      submitMessage
    }
  }
}
</script>

<style scoped>
.gap-y-1 {
  row-gap: 4px;
}
</style>
