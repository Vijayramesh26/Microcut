<template>
  <section id="dashboard" class="py-16 px-4 bg-primary text-white" style="position: relative; overflow: hidden; border-bottom: 2px solid rgb(var(--v-theme-accent));">
    <v-icon size="300" color="rgba(255, 255, 255, 0.01)" style="position: absolute; right: -50px; top: -50px; pointer-events: none;">mdi-view-dashboard</v-icon>

    <v-container class="position-relative" style="z-index: 2;">
      <!-- Section Header -->
      <v-row class="justify-center mb-10">
        <v-col cols="12" class="text-center">
          <v-chip color="accent" variant="flat" class="font-weight-black px-4 mb-4" size="small">
            SIMULATED OFFICE PORTAL
          </v-chip>
          <h2 class="text-h4 text-sm-h3 font-weight-black text-white">Live Operations Dashboard</h2>
          <v-sheet color="accent" height="4" width="80" class="mx-auto mt-4 rounded-pill"></v-sheet>
          <p class="text-body-2 text-grey-lighten-2 mt-4 max-width-md mx-auto">
            Monitoring cutting machine allocations, raw steel inventories, and client quote requests in real time from the Ambattur factory floor.
          </p>
        </v-col>
      </v-row>

      <v-row>
        <!-- Top Stats: Quick Gauges -->
        <v-col cols="12" md="4" class="py-2">
          <v-card flat color="rgba(255, 255, 255, 0.05)" class="pa-5 rounded-xl border border-opacity-10 fill-height" style="border-color: rgba(255, 255, 255, 0.1) !important;">
            <div class="d-flex align-center justify-space-between mb-4">
              <span class="text-subtitle-1 font-weight-bold text-accent">Active Machinery Load</span>
              <v-icon color="accent">mdi-sine-wave</v-icon>
            </div>
            
            <div class="d-flex align-center justify-space-around py-2">
              <v-progress-circular
                :model-value="machineLoadPct"
                :size="100"
                :width="12"
                color="accent"
              >
                <div class="text-center">
                  <div class="text-h6 font-weight-black text-white">{{ activeMachineCount }}/4</div>
                  <div class="text-caption text-grey-lighten-2" style="font-size: 0.65rem !important;">RUNNING</div>
                </div>
              </v-progress-circular>

              <div class="text-left ml-4">
                <div class="text-caption text-grey-lighten-2">Shop floor load</div>
                <div class="text-h6 font-weight-black text-white">{{ machineLoadPct }}% Capacity</div>
                <div class="text-caption text-success font-weight-bold d-flex align-center mt-1">
                  <v-icon start size="14">mdi-check-decagram</v-icon> Normal Operations
                </div>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="8" class="py-2">
          <!-- Inventory gauges -->
          <v-card flat color="rgba(255, 255, 255, 0.05)" class="pa-5 rounded-xl border border-opacity-10 fill-height" style="border-color: rgba(255, 255, 255, 0.1) !important;">
            <div class="d-flex align-center justify-space-between mb-4">
              <span class="text-subtitle-1 font-weight-bold text-secondary">Raw Steel Stock Levels</span>
              <v-icon color="secondary">mdi-chart-bar</v-icon>
            </div>

            <v-row dense class="align-center">
              <v-col cols="12" sm="6" v-for="(inv, i) in inventory" :key="i" class="py-2">
                <div class="d-flex justify-space-between text-caption font-weight-bold text-grey-lighten-2 mb-1">
                  <span>{{ inv.name }}</span>
                  <span>{{ inv.amount }} Tons ({{ inv.pct }}%)</span>
                </div>
                <v-progress-linear
                  v-model="inv.pct"
                  height="8"
                  rounded
                  :color="inv.color"
                  bg-color="rgba(255, 255, 255, 0.1)"
                  bg-opacity="1"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- Row 2: Machinery Active Status Blocks -->
      <v-row class="mt-6">
        <v-col cols="12">
          <h3 class="text-h6 font-weight-bold text-accent mb-4 d-flex align-center">
            <v-icon start>mdi-television-guide</v-icon>
            Live Shop Floor Telemetry
          </h3>
          
          <v-row dense>
            <v-col cols="12" sm="6" lg="3" v-for="mach in activeMachines" :key="mach.id" class="pa-2">
              <v-card flat color="rgba(255, 255, 255, 0.04)" class="pa-4 rounded-xl border border-opacity-10 fill-height d-flex flex-column justify-space-between" style="border-color: rgba(255, 255, 255, 0.08) !important;">
                <div>
                  <div class="d-flex align-center justify-space-between mb-2">
                    <span class="text-caption text-grey-lighten-1 font-weight-bold tracking-wide">{{ mach.id }}</span>
                    <v-chip :color="mach.statusColor" variant="flat" size="x-small" class="font-weight-black">
                      {{ mach.status }}
                    </v-chip>
                  </div>

                  <h4 class="text-subtitle-1 font-weight-bold text-white">{{ mach.name }}</h4>
                  <div class="text-caption text-grey-lighten-2 mt-1">{{ mach.description }}</div>
                </div>

                <div class="mt-4" v-if="mach.status === 'Cutting'">
                  <div class="d-flex justify-space-between text-caption font-weight-bold text-grey-lighten-2 mb-1">
                    <span>Cut Cycle Progress</span>
                    <span>{{ mach.progress }}%</span>
                  </div>
                  <v-progress-linear
                    v-model="mach.progress"
                    height="6"
                    rounded
                    color="accent"
                    striped
                    active
                  ></v-progress-linear>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Row 3: Interactive Inquiries Grid -->
      <v-row class="mt-6">
        <v-col cols="12">
          <v-card flat color="rgba(255, 255, 255, 0.05)" class="pa-6 rounded-2xl border border-opacity-10" style="border-color: rgba(255, 255, 255, 0.1) !important;">
            <div class="d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center mb-6 gap-2">
              <div>
                <h3 class="text-h5 font-weight-black text-white d-flex align-center">
                  <v-icon color="accent" class="mr-2">mdi-database-eye-outline</v-icon>
                  Incoming Quote Inquiries (RFQs)
                </h3>
                <div class="text-caption text-grey-lighten-2 mt-1">Estimates submitted via the customer Quote Estimator tool appear here instantly.</div>
              </div>
              
              <v-chip color="accent" variant="flat" class="font-weight-black">
                {{ localInquiries.length }} Total Requests
              </v-chip>
            </div>

            <!-- Inquiries table -->
            <v-table class="bg-transparent text-white" density="comfortable">
              <thead>
                <tr class="border-bottom-white">
                  <th class="text-left font-weight-bold text-accent text-subtitle-2">RFQ ID</th>
                  <th class="text-left font-weight-bold text-accent text-subtitle-2">Client Company</th>
                  <th class="text-left font-weight-bold text-accent text-subtitle-2">Specs &amp; Qty</th>
                  <th class="text-left font-weight-bold text-accent text-subtitle-2">Est. Weight</th>
                  <th class="text-left font-weight-bold text-accent text-subtitle-2">Cutting Price</th>
                  <th class="text-left font-weight-bold text-accent text-subtitle-2">Inquiry Status</th>
                  <th class="text-center font-weight-bold text-accent text-subtitle-2">Action Operations</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="inq in localInquiries" :key="inq.id" class="border-bottom-white">
                  <td class="font-weight-bold text-body-2 text-white">{{ inq.id }}</td>
                  <td>
                    <div class="font-weight-bold text-body-2 text-white">{{ inq.client }}</div>
                    <div class="text-caption text-grey-lighten-2">{{ inq.contactName }} ({{ inq.email }})</div>
                  </td>
                  <td>
                    <div class="font-weight-bold text-body-2">{{ inq.diameter }}mm {{ inq.shape }}</div>
                    <div class="text-caption text-grey-lighten-2">{{ inq.material }} • Cut Length: {{ inq.cutLength }}mm • Qty: <strong>{{ inq.quantity }} Pcs</strong></div>
                  </td>
                  <td><v-chip size="small" variant="outlined" color="secondary" class="font-weight-bold">{{ inq.weight }} kg</v-chip></td>
                  <td class="font-weight-black text-accent text-body-1">₹{{ inq.cost.toLocaleString('en-IN') }}</td>
                  <td>
                    <v-chip :color="getStatusColor(inq.status)" variant="flat" size="small" class="font-weight-black">
                      {{ inq.status }}
                    </v-chip>
                  </td>
                  <td class="text-center">
                    <div class="d-flex justify-center gap-2">
                      <!-- Approve Button -->
                      <v-btn
                        v-if="inq.status === 'Pending Review'"
                        color="success"
                        size="small"
                        variant="flat"
                        class="text-capitalize font-weight-bold px-3"
                        @click="updateStatus(inq.id, 'Approved')"
                      >
                        Approve
                      </v-btn>

                      <!-- Cut Button -->
                      <v-btn
                        v-if="inq.status === 'Approved'"
                        color="accent"
                        size="small"
                        variant="flat"
                        class="text-capitalize font-weight-bold px-3"
                        @click="startCuttingJob(inq)"
                      >
                        <v-icon start size="14">mdi-scissors-cutting</v-icon>
                        Start Cut
                      </v-btn>

                      <!-- Complete Button -->
                      <v-btn
                        v-if="inq.status === 'Cutting'"
                        color="success"
                        size="small"
                        variant="flat"
                        class="text-capitalize font-weight-bold px-3"
                        @click="updateStatus(inq.id, 'Completed')"
                      >
                        <v-icon start size="14">mdi-check-bold</v-icon>
                        Complete
                      </v-btn>

                      <!-- Archives tag -->
                      <span v-if="inq.status === 'Completed'" class="text-caption text-grey-lighten-2 font-weight-medium">
                        Log Archived
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'DashboardSection',
  props: {
    newInquiry: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    // Inventory items status
    const inventory = ref([
      { name: 'Alloy Steel Rods', amount: 8.5, pct: 85, color: 'accent' },
      { name: 'Carbon Steel Bars', amount: 6.2, pct: 62, color: 'secondary' },
      { name: 'Mild Steel Bundles', amount: 9.1, pct: 91, color: 'success' },
      { name: 'Stainless Steel Rods', amount: 4.8, pct: 48, color: 'warning' }
    ])

    // Pre-populate with realistic dummy requests
    const localInquiries = ref([
      {
        id: 'RFQ-8290',
        client: 'Sarang Auto Parts Pvt Ltd',
        contactName: 'Mr. Sarang',
        email: 'sarangparts@gmail.com',
        phone: '9840123456',
        material: 'Alloy Steel',
        shape: 'Round Bar',
        diameter: 120,
        cutLength: 150,
        quantity: 200,
        weight: '354.20',
        machine: 'Accuratesaw Single Cut (Upto 250)',
        cost: 35400,
        status: 'Approved'
      },
      {
        id: 'RFQ-7411',
        client: 'VELSAKTHI ENGINEERING',
        contactName: 'Mr. Velu',
        email: 'velsakthi@outlook.com',
        phone: '9677884422',
        material: 'Carbon Steel',
        shape: 'Round Bar',
        diameter: 80,
        cutLength: 250,
        quantity: 500,
        weight: '986.50',
        machine: 'Zeal Tech Circular Saw (Upto 80)',
        cost: 18900,
        status: 'Completed'
      },
      {
        id: 'RFQ-6302',
        client: 'BALAJI INDUSTRIES',
        contactName: 'Mr. Balaji',
        email: 'balaji_ind@yahoo.com',
        phone: '9840112233',
        material: 'Stainless Steel',
        shape: 'Hexagonal Bar',
        diameter: 280,
        cutLength: 80,
        quantity: 50,
        weight: '1220.00',
        machine: 'Meba German Bandsaw (Upto 330)',
        cost: 42000,
        status: 'Pending Review'
      }
    ])

    // Machinery Telemetry
    const activeMachines = ref([
      { id: 'COSEN-01', name: 'Cosen Bundle Bandsaw', status: 'Idle', statusColor: 'secondary', description: 'Standby mode. Awaiting bundle cutting cue.', progress: 0 },
      { id: 'MEBA-02', name: 'Meba German Bandsaw', status: 'Idle', statusColor: 'secondary', description: 'Ready. Max capacity 330mm.', progress: 0 },
      { id: 'ACCU-03', name: 'Accuratesaw Single Cut', status: 'Idle', statusColor: 'secondary', description: 'Available for single-rod setups.', progress: 0 },
      { id: 'ZEAL-04', name: 'Zeal Tech Circular Saw', status: 'Idle', statusColor: 'secondary', description: 'Ready for high-volume rapid cuts.', progress: 0 }
    ])

    // Watch for new inquiries emitted by the parent
    watch(() => props.newInquiry, (newVal) => {
      if (newVal) {
        // Prepend new inquiry
        localInquiries.value.unshift({ ...newVal })
      }
    })

    const getStatusColor = (status) => {
      switch (status) {
        case 'Pending Review': return 'warning'
        case 'Approved': return 'info'
        case 'Cutting': return 'accent'
        case 'Completed': return 'success'
        default: return 'secondary'
      }
    }

    const updateStatus = (id, newStatus) => {
      const item = localInquiries.value.find(x => x.id === id)
      if (item) {
        item.status = newStatus
      }
    }

    const startCuttingJob = (inq) => {
      // Find matching machine based on inquiry machine allocation
      let machineId = ''
      if (inq.machine.includes('Cosen')) machineId = 'COSEN-01'
      else if (inq.machine.includes('Meba')) machineId = 'MEBA-02'
      else if (inq.machine.includes('Accuratesaw')) machineId = 'ACCU-03'
      else machineId = 'ZEAL-04'

      const machine = activeMachines.value.find(m => m.id === machineId)
      if (machine) {
        machine.status = 'Cutting'
        machine.statusColor = 'accent'
        machine.description = `Cutting job ${inq.id} for ${inq.client} (${inq.diameter}mm ${inq.shape})`
        machine.progress = 10

        // Set status in inquiry to 'Cutting'
        inq.status = 'Cutting'

        // Simulate progress timer
        const timer = setInterval(() => {
          if (machine.progress < 90) {
            machine.progress += 20
          } else {
            clearInterval(timer)
          }
        }, 1500)
      }
    }

    // Dynamic calculations
    const activeMachineCount = computed(() => {
      return activeMachines.value.filter(m => m.status === 'Cutting').length
    })

    const machineLoadPct = computed(() => {
      return (activeMachineCount.value / 4) * 100
    })

    return {
      inventory,
      localInquiries,
      activeMachines,
      getStatusColor,
      updateStatus,
      startCuttingJob,
      activeMachineCount,
      machineLoadPct
    }
  }
}
</script>

<style scoped>
.border-bottom-white {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}

tr:hover {
  background-color: rgba(255, 255, 255, 0.02) !important;
}

.bg-primary :deep(.v-table__wrapper) {
  background-color: transparent !important;
}

.bg-primary :deep(.v-table) {
  background-color: transparent !important;
}

.bg-primary :deep(th) {
  color: rgb(var(--v-theme-accent)) !important;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1) !important;
}

.bg-primary :deep(td) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;
}

.gap-2 {
  gap: 8px;
}
</style>
