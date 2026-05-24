<template>
  <section id="gallery" class="py-16 px-4 bg-surface cad-blueprint-bg" style="border-bottom: 1px solid rgba(143, 166, 180, 0.1);">
    <v-container>
      <!-- Section Header -->
      <v-row class="justify-center mb-10" style="position: relative; z-index: 2;">
        <v-col cols="12" class="text-center fade-up" v-animate>
          <span class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">Our Work</span>
          <div class="font-mono text-caption text-grey mt-1">[SYS-REF: FAC-PLANT-SHOW]</div>
          <h2 class="laser-header text-h4 text-sm-h3 font-weight-black text-primary mt-2" v-animate>Facility &amp; Operations</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
          <p class="text-body-2 text-grey-darken-1 mt-4 max-width-md mx-auto">
            Take a look inside our state-of-the-art SIDCO industrial plant and see our precision cutting machines in action.
          </p>
        </v-col>
      </v-row>

      <!-- Gallery Grid -->
      <v-row>
        <v-col
          v-for="(image, index) in galleryImages"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          class="d-flex child-flex"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              flat
              class="rounded-xl overflow-hidden position-relative border cursor-pointer hover-scale tech-card"
              style="border-color: rgba(143, 166, 180, 0.2) !important; aspect-ratio: 4/3;"
              v-bind="props"
            >
              <v-img
                :src="image.src"
                :lazy-src="image.src"
                aspect-ratio="4/3"
                cover
                class="align-end bg-grey-lighten-2"
                :class="{ 'zoom-image': isHovering }"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0 align-center justify-center">
                    <v-progress-circular indeterminate color="grey-lighten-1"></v-progress-circular>
                  </v-row>
                </template>
                
                <!-- Overlay Gradient -->
                <div class="image-overlay d-flex flex-column justify-end px-4 py-4 w-100 h-100">
                  <div class="overlay-content" :class="{ 'overlay-visible': isHovering }">
                    <h3 class="text-subtitle-1 font-weight-bold text-white">{{ image.title }}</h3>
                    <p class="text-caption text-grey-lighten-2 mt-1">{{ image.description }}</p>
                  </div>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'GallerySection',
  setup() {
    const galleryImages = [
      {
        src: '/gallery/cutting_machine.png',
        title: 'Heavy Duty Bandsaw',
        description: 'Automatic high-speed circular saw cutting through solid steel rods.'
      },
      {
        src: '/gallery/precision_parts.png',
        title: 'Precision Machining',
        description: 'Perfectly machined, shiny precision steel components ready for delivery.'
      },
      {
        src: '/gallery/factory_floor.png',
        title: 'SIDCO Plant Floor',
        description: 'Our modern 2000 sq.ft industrial facility equipped with a 2-ton overhead crane.'
      }
    ]

    return {
      galleryImages
    }
  }
}
</script>

<style scoped>
.max-width-md {
  max-width: 600px;
}

.zoom-image {
  transform: scale(1.05);
  transition: transform 0.5s ease;
}

.v-img {
  transition: transform 0.5s ease;
}

.image-overlay {
  background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hover-scale:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.overlay-visible {
  transform: translateY(0);
}
</style>
