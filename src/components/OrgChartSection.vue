<template>
  <section id="org" class="py-16 px-4 bg-surface" style="border-top: 1px solid rgba(143, 166, 180, 0.1); border-bottom: 1px solid rgba(143, 166, 180, 0.1);">
    <v-container>
      <!-- Section Header -->
      <v-row class="justify-center mb-10">
        <v-col cols="12" class="text-center">
          <span class="text-subtitle-2 font-weight-black text-secondary tracking-widest text-uppercase">Team &amp; Governance</span>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-primary mt-2">Organization Structure</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
          <p class="text-body-2 text-grey-darken-1 mt-4 max-width-md mx-auto">
            Click on any operational division to view core responsibilities and team workflows.
          </p>
        </v-col>
      </v-row>

      <!-- Desktop Hierarchical Chart -->
      <div class="d-none md-tree-container md-flex flex-column align-center">
        <!-- Root node -->
        <v-card
          flat
          class="pa-4 rounded-xl border-t-accent hover-scale text-center border cursor-pointer org-root"
          color="primary"
          style="width: 280px; border-top-width: 4px !important;"
          @click="selectRole('partners')"
        >
          <v-avatar color="rgba(255, 255, 255, 0.15)" class="mb-2" size="44">
            <v-icon color="accent" size="24">mdi-account-tie-outline</v-icon>
          </v-avatar>
          <div class="font-weight-black text-subtitle-1 text-white">Mr. Kishore / Mr. Santhosh</div>
          <div class="text-caption text-grey-lighten-2">Managing Partners</div>
        </v-card>

        <!-- Vertical Connect Line 1 -->
        <div class="org-line"></div>

        <!-- Horizontal Divider line for children -->
        <div class="org-horizontal-connector"></div>

        <!-- Children Grid -->
        <div class="d-flex justify-center flex-row flex-wrap mt-0 org-children-row">
          
          <!-- Column 1: Production (with sub-operator node) -->
          <div class="d-flex flex-column align-center px-2" style="width: 210px;">
            <div class="org-connector-up"></div>
            <v-card
              flat
              class="pa-3 rounded-lg hover-scale text-center border cursor-pointer org-node"
              @click="selectRole('production')"
            >
              <v-icon color="secondary" class="mb-1" size="24">mdi-cogs</v-icon>
              <div class="font-weight-bold text-body-2 text-primary">Production</div>
              <div class="text-caption text-grey-darken-1">In-Charge</div>
            </v-card>
            <div class="org-line" style="height: 16px;"></div>
            <v-card
              flat
              class="pa-2 rounded-lg hover-scale text-center border cursor-pointer org-sub-node"
              @click="selectRole('operator')"
            >
              <v-icon color="accent" class="mb-1" size="18">mdi-hard-hat</v-icon>
              <div class="font-weight-bold text-caption text-primary">Operator Team</div>
              <div class="text-caption text-grey-darken-1" style="font-size: 0.7rem !important;">Machinery Works</div>
            </v-card>
          </div>

          <!-- Column 2: Quality -->
          <div class="d-flex flex-column align-center px-2" style="width: 210px;">
            <div class="org-connector-up"></div>
            <v-card
              flat
              class="pa-3 rounded-lg hover-scale text-center border cursor-pointer org-node"
              @click="selectRole('quality')"
            >
              <v-icon color="secondary" class="mb-1" size="24">mdi-shield-check-outline</v-icon>
              <div class="font-weight-bold text-body-2 text-primary">Quality</div>
              <div class="text-caption text-grey-darken-1">In-Charge</div>
            </v-card>
          </div>

          <!-- Column 3: Purchase -->
          <div class="d-flex flex-column align-center px-2" style="width: 210px;">
            <div class="org-connector-up"></div>
            <v-card
              flat
              class="pa-3 rounded-lg hover-scale text-center border cursor-pointer org-node"
              @click="selectRole('purchase')"
            >
              <v-icon color="secondary" class="mb-1" size="24">mdi-cart-arrow-down</v-icon>
              <div class="font-weight-bold text-body-2 text-primary">Purchase</div>
              <div class="text-caption text-grey-darken-1">In-Charge</div>
            </v-card>
          </div>

          <!-- Column 4: Marketing & Admin -->
          <div class="d-flex flex-column align-center px-2" style="width: 210px;">
            <div class="org-connector-up"></div>
            <v-card
              flat
              class="pa-3 rounded-lg hover-scale text-center border cursor-pointer org-node"
              @click="selectRole('marketing')"
            >
              <v-icon color="secondary" class="mb-1" size="24">mdi-bullhorn-outline</v-icon>
              <div class="font-weight-bold text-body-2 text-primary">Marketing &amp; Admin</div>
              <div class="text-caption text-grey-darken-1">In-Charge</div>
            </v-card>
          </div>

          <!-- Column 5: Accounts / Finance -->
          <div class="d-flex flex-column align-center px-2" style="width: 210px;">
            <div class="org-connector-up"></div>
            <v-card
              flat
              class="pa-3 rounded-lg hover-scale text-center border cursor-pointer org-node"
              @click="selectRole('accounts')"
            >
              <v-icon color="secondary" class="mb-1" size="24">mdi-calculator-variant-outline</v-icon>
              <div class="font-weight-bold text-body-2 text-primary">Accounts / Finance</div>
              <div class="text-caption text-grey-darken-1">In-Charge</div>
            </v-card>
          </div>
          
        </div>
      </div>

      <!-- Mobile List/Expansion Tree View -->
      <div class="d-md-none">
        <v-card flat class="pa-4 rounded-xl border bg-primary text-white text-center mb-4 cursor-pointer" @click="selectRole('partners')">
          <v-avatar color="rgba(255, 255, 255, 0.15)" class="mb-2" size="40">
            <v-icon color="accent" size="20">mdi-account-tie-outline</v-icon>
          </v-avatar>
          <div class="font-weight-black text-body-1">Mr. Kishore / Mr. Santhosh</div>
          <div class="text-caption text-grey-lighten-2">Managing Partners (Click for Details)</div>
        </v-card>

        <div class="text-center my-2 text-subtitle-2 text-grey">Division Heads</div>
        
        <v-row dense>
          <v-col cols="12" v-for="(node, key) in mobileRoles" :key="key">
            <v-card flat class="pa-3 rounded-xl border bg-surface hover-scale d-flex align-center cursor-pointer" @click="selectRole(key)">
              <v-avatar :color="node.sub ? 'rgba(217, 179, 16, 0.1)' : 'rgba(50, 140, 193, 0.1)'" class="mr-3" size="36">
                <v-icon :color="node.sub ? 'accent' : 'secondary'" size="20">{{ node.icon }}</v-icon>
              </v-avatar>
              <div>
                <div class="font-weight-bold text-body-2 text-primary">{{ node.name }}</div>
                <div class="text-caption text-grey-darken-1">{{ node.title }}</div>
              </div>
              <v-spacer></v-spacer>
              <v-icon color="grey-lighten-1" size="20">mdi-chevron-right</v-icon>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Interactive Dialog/Drawer for Role Info -->
      <v-dialog v-model="dialog" max-width="500px" transition="dialog-bottom-transition">
        <v-card flat class="pa-6 rounded-2xl bg-surface border" v-if="activeRoleData">
          <div class="d-flex align-center justify-space-between mb-4">
            <div class="d-flex align-center">
              <v-avatar :color="activeRoleData.color" class="mr-3" size="48">
                <v-icon color="white" size="26">{{ activeRoleData.icon }}</v-icon>
              </v-avatar>
              <div>
                <h3 class="text-h5 font-weight-black text-primary">{{ activeRoleData.name }}</h3>
                <div class="text-subtitle-2 text-secondary font-weight-medium">{{ activeRoleData.title }}</div>
              </div>
            </div>
            <v-btn icon="mdi-close" variant="text" size="small" @click="dialog = false"></v-btn>
          </div>

          <v-divider class="mb-4"></v-divider>

          <p class="text-body-1 text-grey-darken-2 mb-4 leading-relaxed">
            {{ activeRoleData.description }}
          </p>

          <div class="text-subtitle-2 font-weight-bold text-primary mb-2">Key Responsibilities:</div>
          <v-list dense class="pa-0 bg-transparent">
            <v-list-item
              v-for="(resp, i) in activeRoleData.responsibilities"
              :key="i"
              class="px-0 py-1"
            >
              <template v-slot:prepend>
                <v-icon color="accent" size="18" class="mr-2">mdi-check-circle-outline</v-icon>
              </template>
              <v-list-item-title class="text-body-2 text-wrap text-grey-darken-3 font-weight-medium">
                {{ resp }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          
          <v-btn block color="primary" class="mt-6 font-weight-bold text-capitalize py-2" @click="dialog = false">
            Close Panel
          </v-btn>
        </v-card>
      </v-dialog>
    </v-container>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'OrgChartSection',
  setup() {
    const dialog = ref(false)
    const activeRole = ref('')
    const activeRoleData = ref(null)

    const roleDetails = {
      partners: {
        name: 'Mr. Kishore / Mr. Santhosh',
        title: 'Managing Partners',
        icon: 'mdi-account-tie-outline',
        color: 'primary',
        description: 'Provide executive leadership and oversight for Microcut Engineering. Responsible for customer relationships, plant governance, quality standards management, and future strategic growth initiatives.',
        responsibilities: [
          'Direct customer interaction and business negotiation.',
          'Overall plant supervision and compliance oversight.',
          'Investment strategy & procurement of state-of-the-art machines.',
          'Upholding 100% on-time delivery commitment.'
        ]
      },
      production: {
        name: 'Production In-Charge',
        title: 'Operations Division',
        icon: 'mdi-cogs',
        color: 'secondary',
        description: 'Coordinates shop floor activities, job schedules, material handling, and production logs. Synchronizes machine allocations to minimize delays and maximize cutting throughput.',
        responsibilities: [
          'Scheduling cutting jobs on Meba, Cosen, Accuratesaw machines.',
          'Directing crane logistics and raw material handling safety.',
          'Supervising the operator workforce and shifts.',
          'Monitoring cutting tolerances and tooling blade health.'
        ]
      },
      operator: {
        name: 'Operator Team',
        title: 'Machinery Works Division',
        icon: 'mdi-hard-hat',
        color: 'accent',
        description: 'Highly skilled mechanical personnel executing rod cutting, circular saw cutting, and bundle bandsaw works on the shop floor. Ensures material handling compliance.',
        responsibilities: [
          'Setting cutting specifications and speed parameters.',
          'Loading bar bundles into Cosan and Meba bandsaws safely.',
          'Conducting first-cut dimensional verification.',
          'Ensuring strict safety adherence during crane loading.'
        ]
      },
      quality: {
        name: 'Quality In-Charge',
        title: 'Inspection & Assurance Division',
        icon: 'mdi-shield-check-outline',
        color: 'success',
        description: 'Enforces strict dimensional and surface finishing standards. Oversees CCTV surveillance feeds for material tracking and handles ISO-level product reporting.',
        responsibilities: [
          '100% inspection of final cut lengths and finishes.',
          'Deploying calibrators and micrometer measurements.',
          'Supervising CCTV material assurance monitors.',
          'Auditing machine processes for quality improvement.'
        ]
      },
      purchase: {
        name: 'Purchase In-Charge',
        title: 'Procurement & Inventory Division',
        icon: 'mdi-cart-arrow-down',
        color: 'warning',
        description: 'Manages steel mills, vendor relationships, and spare tooling (saw blades, oils, hydraulic parts). Oversees stock levels to match ongoing client job queues.',
        responsibilities: [
          'Procurement of quality raw rod stocks.',
          'Negotiating saw blade bulk pricing with manufacturers.',
          'Monitoring inventory of tooling consumables.',
          'Coordinating warehouse stock placement.'
        ]
      },
      marketing: {
        name: 'Marketing & Admin',
        title: 'Client Relations Division',
        icon: 'mdi-bullhorn-outline',
        color: 'info',
        description: 'Manages client communications, contract administration, billing documentation, and SIDCO industrial networks. First point of contact for new business inquiries.',
        responsibilities: [
          'Client database maintenance and order filings.',
          'Handling incoming RFQs and generating quotations.',
          'Administering corporate compliance and MSME audits.',
          'Social and local industry PR campaigns.'
        ]
      },
      accounts: {
        name: 'Accounts & Finance',
        title: 'Financial Management Division',
        icon: 'mdi-calculator-variant-outline',
        color: 'primary',
        description: 'Oversees payroll, vendor invoicing, taxation, audit documentation, bank operations, and budget forecasts for Microcut Engineering.',
        responsibilities: [
          'MSME commercial billing and invoice reconciliations.',
          'Managing cashflows and supplier payouts.',
          'Monthly taxation and GST compliance filings.',
          'Cost and profit margin analysis.'
        ]
      }
    }

    const mobileRoles = {
      production: { name: 'Production', title: 'In-Charge & Operators', icon: 'mdi-cogs' },
      operator: { name: 'Operator Team', title: 'Machinery Works', icon: 'mdi-hard-hat', sub: true },
      quality: { name: 'Quality', title: 'In-Charge', icon: 'mdi-shield-check-outline' },
      purchase: { name: 'Purchase', title: 'In-Charge', icon: 'mdi-cart-arrow-down' },
      marketing: { name: 'Marketing & Admin', title: 'In-Charge', icon: 'mdi-bullhorn-outline' },
      accounts: { name: 'Accounts / Finance', title: 'In-Charge', icon: 'mdi-calculator-variant-outline' }
    }

    const selectRole = (roleKey) => {
      activeRole.value = roleKey
      activeRoleData.value = roleDetails[roleKey]
      dialog.value = true
    }

    return {
      dialog,
      activeRoleData,
      mobileRoles,
      selectRole
    }
  }
}
</script>

<style scoped>
.leading-relaxed {
  line-height: 1.625;
}

.max-width-md {
  max-width: 600px;
}

/* Tree Connector CSS - For Desktop */
.md-tree-container {
  width: 100%;
  margin-top: 10px;
  position: relative;
}

.org-root {
  border: 1px solid rgba(143, 166, 180, 0.2) !important;
}

.org-node {
  width: 190px;
  background-color: rgb(var(--v-theme-surface)) !important;
  border: 1px solid rgba(143, 166, 180, 0.2) !important;
  border-top: 3px solid rgb(var(--v-theme-secondary)) !important;
  z-index: 2;
}

.org-sub-node {
  width: 150px;
  background-color: rgb(var(--v-theme-surface)) !important;
  border: 1px dashed rgba(143, 166, 180, 0.4) !important;
  border-top: 3px solid rgb(var(--v-theme-accent)) !important;
  z-index: 2;
}

.org-horizontal-connector {
  width: 80%; /* Adjust to cover columns */
  height: 2px;
  background: #328cc1;
  margin: 0 auto;
}

.org-connector-up {
  width: 2px;
  height: 24px;
  background: #328cc1;
}

.org-children-row {
  width: 100%;
}

@media (min-width: 960px) {
  .md-flex {
    display: flex !important;
  }
}
</style>
