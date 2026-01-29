<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// API endpoint - points to admin API
const API_BASE = 'https://lookbook-admin-api.robert-royster.workers.dev/api'

// Capture affiliate param from URL
const route = useRoute()
const affiliate = ref('')

onMounted(() => {
  affiliate.value = route.query.affiliate || ''
})

// UI States
const viewState = ref('form') // 'form' | 'processing' | 'success' | 'error'

// Current step (1 = Restaurant, 2 = Contact, 3 = Menu)
const currentStep = ref(1)

// Form fields
const name = ref('')
const address = ref('')
const city = ref('')
const state = ref('NC')
const zip = ref('')
const email = ref('')
const mobile = ref('')

// Menu input
const menuType = ref('pdf-upload') // 'pdf-upload' | 'pdf-url' | 'website-url'
const menuFile = ref(null)
const menuFileName = ref('')
const menuUrl = ref('')

// Processing state
const processingStep = ref('')
const processingProgress = ref(0)

// Result state
const result = ref(null)

// Error state
const error = ref('')

// US States dropdown
const usStates = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
]

// Step validation
const isStep1Valid = computed(() => {
  return name.value.trim().length > 0 && city.value.trim().length > 0
})

const isStep2Valid = computed(() => {
  return email.value.includes('@')
})

const isStep3Valid = computed(() => {
  if (menuType.value === 'pdf-upload') return menuFile.value !== null
  return menuUrl.value.trim().length > 0
})

const isFormValid = computed(() => {
  return isStep1Valid.value && isStep2Valid.value && isStep3Valid.value
})

// Format expiration date
function formatExpiresAt(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

// Handle file selection
function handleFileSelect(event) {
  const file = event.target.files?.[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'PDF file must be less than 5MB'
      return
    }
    menuFile.value = file
    menuFileName.value = file.name
    error.value = ''
  }
}

// Handle drag and drop
function handleDrop(event) {
  event.preventDefault()
  const file = event.dataTransfer?.files?.[0]
  if (file && file.type === 'application/pdf') {
    if (file.size > 5 * 1024 * 1024) {
      error.value = 'PDF file must be less than 5MB'
      return
    }
    menuFile.value = file
    menuFileName.value = file.name
    error.value = ''
  }
}

function handleDragOver(event) {
  event.preventDefault()
}

// Navigation
function nextStep() {
  if (currentStep.value === 1 && isStep1Valid.value) {
    currentStep.value = 2
  } else if (currentStep.value === 2 && isStep2Valid.value) {
    currentStep.value = 3
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function goToStep(step) {
  if (step < currentStep.value) {
    currentStep.value = step
  } else if (step === 2 && isStep1Valid.value) {
    currentStep.value = 2
  } else if (step === 3 && isStep1Valid.value && isStep2Valid.value) {
    currentStep.value = 3
  }
}

// Submit form
async function submitForm() {
  if (!isFormValid.value) {
    error.value = 'Please fill in all required fields'
    return
  }

  error.value = ''
  viewState.value = 'processing'
  processingStep.value = 'Preparing your menu...'
  processingProgress.value = 10

  try {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('address', address.value)
    formData.append('city', city.value)
    formData.append('state', state.value)
    formData.append('zip', zip.value)
    formData.append('email', email.value)
    formData.append('mobile', mobile.value)
    formData.append('menuType', menuType.value)

    if (menuType.value === 'pdf-upload' && menuFile.value) {
      formData.append('menuFile', menuFile.value)
    } else if (menuUrl.value) {
      formData.append('menuUrl', menuUrl.value)
    }

    // Only include affiliate if present
    if (affiliate.value) {
      formData.append('affiliate', affiliate.value)
    }

    processingStep.value = 'Uploading menu...'
    processingProgress.value = 30

    const response = await fetch(`${API_BASE}/try/create`, {
      method: 'POST',
      body: formData
    })

    processingStep.value = 'Extracting menu items with AI...'
    processingProgress.value = 60

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create demo')
    }

    processingStep.value = 'Creating your lookbook...'
    processingProgress.value = 90

    await new Promise(resolve => setTimeout(resolve, 500))

    processingProgress.value = 100
    result.value = data
    viewState.value = 'success'

  } catch (err) {
    console.error('Submit error:', err)
    error.value = err instanceof Error ? err.message : 'Something went wrong'
    viewState.value = 'error'
  }
}

// Copy URL to clipboard
const copied = ref(false)
async function copyUrl() {
  if (!result.value) return
  try {
    await navigator.clipboard.writeText(result.value.previewUrl)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Copy failed:', err)
  }
}

// Reset form
function startOver() {
  viewState.value = 'form'
  currentStep.value = 1
  result.value = null
  error.value = ''
  processingProgress.value = 0
  processingStep.value = ''
}
</script>

<template>
  <div class="try-page">
    <!-- Header -->
    <header class="try-header">
      <div class="header-content">
        <div class="logo-group">
          <div class="logo-icon"></div>
          <div class="logo-text">
            <div class="logo-title">Lookbook Menu</div>
            <div class="logo-subtitle">Photo-first digital menus</div>
          </div>
        </div>
        <a class="learn-more" href="/">View menus</a>
      </div>
    </header>

    <!-- Form State -->
    <main v-if="viewState === 'form'" class="try-main">
      <!-- Left: pitch -->
      <section class="pitch-section">
        <h1 class="headline">
          Eat with your <span class="highlight">eyes</span>.
        </h1>

        <p class="subheadline">
          Right now, guests are squinting at a PDF menu full of words.
          Lookbook turns that same browsing moment into "I have to get that."
        </p>

        <p class="support-line">Menus explain. Lookbooks convince.</p>

        <div class="badges">
          <span class="badge">30-day demo link</span>
          <span class="badge">No credit card</span>
          <span class="badge">We email your lookbook link</span>
        </div>

        <div class="info-box">
          <div class="info-title">What happens next</div>
          <ol class="info-list">
            <li><span class="step-num">1.</span> Upload a PDF / paste a menu URL / give us your website</li>
            <li><span class="step-num">2.</span> We generate a photo-first lookbook layout</li>
            <li><span class="step-num">3.</span> You get a shareable link to review + send to guests</li>
          </ol>
        </div>

        <a href="/featured/bartaco" class="example-link">
          See an example lookbook
        </a>
      </section>

      <!-- Right: form card -->
      <section class="form-card">
        <!-- Stepper -->
        <div class="stepper">
          <button @click="goToStep(1)" class="step-item" :class="{ active: currentStep >= 1 }">
            <span class="step-circle">1</span>
            <span class="step-label">Restaurant</span>
          </button>
          <div class="step-line"></div>
          <button @click="goToStep(2)" class="step-item" :class="{ active: currentStep >= 2 }">
            <span class="step-circle">2</span>
            <span class="step-label">Contact</span>
          </button>
          <div class="step-line"></div>
          <button @click="goToStep(3)" class="step-item" :class="{ active: currentStep >= 3 }">
            <span class="step-circle">3</span>
            <span class="step-label">Menu</span>
          </button>
        </div>

        <form @submit.prevent="submitForm" class="try-form">
          <!-- Step 1: Restaurant -->
          <div v-if="currentStep === 1" class="form-step">
            <div class="step-header">
              <div class="step-title">Restaurant info</div>
              <div class="step-desc">This helps label your lookbook and build your public link.</div>
            </div>

            <div class="form-fields">
              <div class="field full">
                <label class="label">Restaurant name <span class="required">*</span></label>
                <input v-model="name" class="input" placeholder="e.g., The Corner Bistro" />
              </div>

              <div class="field full">
                <label class="label">Street address</label>
                <input v-model="address" class="input" placeholder="123 Main Street" />
              </div>

              <div class="field">
                <label class="label">City <span class="required">*</span></label>
                <input v-model="city" class="input" placeholder="Raleigh" />
              </div>

              <div class="field-row">
                <div class="field">
                  <label class="label">State</label>
                  <select v-model="state" class="input">
                    <option v-for="st in usStates" :key="st" :value="st">{{ st }}</option>
                  </select>
                </div>
                <div class="field">
                  <label class="label">ZIP</label>
                  <input v-model="zip" class="input" placeholder="27601" />
                </div>
              </div>
            </div>

            <button type="button" @click="nextStep" :disabled="!isStep1Valid" class="btn-primary full">
              Continue
            </button>
          </div>

          <!-- Step 2: Contact -->
          <div v-if="currentStep === 2" class="form-step">
            <div class="step-header">
              <div class="step-title">Contact info</div>
              <div class="step-desc">We'll email your demo link. No spam.</div>
            </div>

            <div class="form-fields">
              <div class="field full">
                <label class="label">Email <span class="required">*</span></label>
                <input v-model="email" type="email" class="input" placeholder="owner@restaurant.com" />
              </div>

              <div class="field full">
                <label class="label">Mobile (optional)</label>
                <input v-model="mobile" type="tel" class="input" placeholder="(555) 123-4567" />
              </div>
            </div>

            <div class="button-row">
              <button type="button" @click="prevStep" class="btn-secondary">Back</button>
              <button type="button" @click="nextStep" :disabled="!isStep2Valid" class="btn-primary">Continue</button>
            </div>
          </div>

          <!-- Step 3: Menu -->
          <div v-if="currentStep === 3" class="form-step">
            <div class="step-header">
              <div class="step-title">Your menu</div>
              <div class="step-desc">Upload a PDF (best) or paste a menu URL.</div>
            </div>

            <!-- Tabs -->
            <div class="menu-tabs">
              <button type="button" @click="menuType = 'pdf-upload'" :class="{ active: menuType === 'pdf-upload' }" class="tab">Upload PDF</button>
              <button type="button" @click="menuType = 'pdf-url'" :class="{ active: menuType === 'pdf-url' }" class="tab">PDF URL</button>
              <button type="button" @click="menuType = 'website-url'" :class="{ active: menuType === 'website-url' }" class="tab">Website</button>
            </div>

            <!-- Upload PDF -->
            <div v-if="menuType === 'pdf-upload'" class="menu-input">
              <label @drop="handleDrop" @dragover="handleDragOver" class="dropzone" :class="{ 'has-file': menuFile }">
                <div class="dropzone-content">
                  <div class="dropzone-icon">{{ menuFile ? '✓' : '📄' }}</div>
                  <div class="dropzone-text">
                    <div class="dropzone-title">{{ menuFile ? menuFileName : 'Drag & drop your PDF' }}</div>
                    <div class="dropzone-hint">{{ menuFile ? 'Click to change file' : 'or click to browse (max 5MB)' }}</div>
                  </div>
                </div>
                <input type="file" accept="application/pdf" @change="handleFileSelect" class="file-input" />
              </label>
            </div>

            <!-- PDF URL -->
            <div v-if="menuType === 'pdf-url'" class="menu-input">
              <input v-model="menuUrl" type="url" class="input" placeholder="https://example.com/menu.pdf" />
              <p class="input-hint">Direct link to a PDF menu file</p>
            </div>

            <!-- Website URL -->
            <div v-if="menuType === 'website-url'" class="menu-input">
              <input v-model="menuUrl" type="url" class="input" placeholder="https://restaurant.com/menu" />
              <p class="input-hint">URL to your menu page (we'll extract items automatically)</p>
            </div>

            <!-- Error -->
            <div v-if="error" class="error-box">{{ error }}</div>

            <div class="button-row">
              <button type="button" @click="prevStep" class="btn-secondary">Back</button>
              <button type="submit" :disabled="!isStep3Valid" class="btn-primary">Create My Lookbook</button>
            </div>

            <p class="form-footer">Your demo stays live for 30 days. No credit card required.</p>
          </div>
        </form>
      </section>
    </main>

    <!-- Processing State -->
    <main v-if="viewState === 'processing'" class="processing-state">
      <div class="processing-icon">🪄</div>
      <h2 class="processing-title">Creating Your Lookbook</h2>
      <p class="processing-text">{{ processingStep }}</p>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${processingProgress}%` }"></div>
      </div>
      <p class="progress-text">{{ processingProgress }}%</p>
    </main>

    <!-- Success State -->
    <main v-if="viewState === 'success' && result" class="success-state">
      <div class="success-icon">🎉</div>
      <h2 class="success-title">Your Lookbook is Ready!</h2>
      <p class="success-text">
        We found <strong>{{ result.itemCount }} items</strong>
        across <strong>{{ result.categoryCount }} categories</strong>
      </p>

      <!-- QR Code -->
      <div class="qr-section">
        <div class="qr-code">
          <img v-if="result.qrCodeDataUrl" :src="result.qrCodeDataUrl" alt="QR Code" />
          <div v-else class="qr-placeholder">QR Code</div>
        </div>
        <p class="qr-hint">Scan to view on mobile</p>
      </div>

      <!-- Share link -->
      <div class="share-section">
        <div class="share-label">Shareable Link</div>
        <div class="share-row">
          <input :value="result.previewUrl" readonly class="input share-input" />
          <button @click="copyUrl" class="btn-secondary">{{ copied ? 'Copied!' : 'Copy' }}</button>
        </div>
      </div>

      <!-- Actions -->
      <div class="action-buttons">
        <a :href="result.previewUrl" target="_blank" class="btn-primary full">View Your Lookbook</a>
        <button @click="startOver" class="btn-secondary full">Create Another</button>
      </div>

      <!-- Categories -->
      <div v-if="result.categories.length > 0" class="categories-section">
        <div class="categories-label">Menu Categories Found</div>
        <div class="categories-list">
          <span v-for="cat in result.categories" :key="cat" class="category-badge">{{ cat }}</span>
        </div>
      </div>

      <!-- Expiration -->
      <div class="expiration-notice">
        <p>This demo expires on {{ formatExpiresAt(result.expiresAt) }}.</p>
        <p><a href="https://lookbook-admin.pages.dev/onboarding">Create a free account</a> to keep it permanently.</p>
      </div>
    </main>

    <!-- Error State -->
    <main v-if="viewState === 'error'" class="error-state">
      <div class="error-icon">😞</div>
      <h2 class="error-title">Something Went Wrong</h2>
      <p class="error-text">{{ error }}</p>
      <button @click="startOver" class="btn-primary">Try Again</button>
    </main>
  </div>
</template>

<style scoped>
.try-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #09090b, #18181b);
  color: #fafafa;
}

/* Header */
.try-header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #fcd34d, #f97316);
}

.logo-title {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.2;
}

.logo-subtitle {
  font-size: 0.75rem;
  color: #a1a1aa;
}

.learn-more {
  font-size: 0.875rem;
  color: #d4d4d8;
  text-decoration: none;
}

.learn-more:hover {
  color: #fff;
}

/* Main layout */
.try-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  display: grid;
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .try-main {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

/* Pitch section */
.pitch-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.headline {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

@media (min-width: 640px) {
  .headline {
    font-size: 3rem;
  }
}

.highlight {
  color: #fcd34d;
}

.subheadline {
  font-size: 1.125rem;
  color: #d4d4d8;
  max-width: 32rem;
}

.support-line {
  font-size: 1.25rem;
  font-weight: 500;
  color: #fcd34d;
  font-style: italic;
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.badge {
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid #27272a;
  background: rgba(9, 9, 11, 0.6);
  font-size: 0.875rem;
  color: #e4e4e7;
}

.info-box {
  margin-top: 0.5rem;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #27272a;
  background: rgba(9, 9, 11, 0.4);
}

.info-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #e4e4e7;
}

.info-list {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #d4d4d8;
  list-style: none;
}

.info-list li {
  display: flex;
  gap: 0.5rem;
}

.step-num {
  color: #fcd34d;
}

.example-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1rem;
  color: #d4d4d8;
  text-decoration: none;
  transition: color 0.15s;
}

.example-link:hover {
  color: #fcd34d;
}

/* Form card */
.form-card {
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid #27272a;
  background: rgba(9, 9, 11, 0.6);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

/* Stepper */
.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #a1a1aa;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
}

.step-circle {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-size: 0.875rem;
  background: #18181b;
  border: 1px solid #27272a;
  color: #d4d4d8;
}

.step-item.active .step-circle {
  background: rgba(252, 211, 77, 0.2);
  border-color: transparent;
  color: #fde68a;
}

.step-item.active .step-label {
  color: #e4e4e7;
}

.step-line {
  flex: 1;
  height: 1px;
  background: #27272a;
  margin: 0 0.75rem;
}

/* Form */
.try-form {
  margin-top: 1.5rem;
}

.form-step {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-header {
  margin-bottom: 0.5rem;
}

.step-title {
  font-size: 0.875rem;
  font-weight: 600;
}

.step-desc {
  font-size: 0.875rem;
  color: #a1a1aa;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field.full {
  width: 100%;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.label {
  font-size: 0.875rem;
  color: #d4d4d8;
}

.required {
  color: #fcd34d;
}

.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #27272a;
  background: #09090b;
  color: #fafafa;
  font-size: 1rem;
}

.input::placeholder {
  color: #52525b;
}

.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(252, 211, 77, 0.4);
}

select.input {
  appearance: none;
  cursor: pointer;
}

/* Buttons */
.btn-primary {
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  border: none;
  background: linear-gradient(to right, #fcd34d, #f97316);
  color: #09090b;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.1);
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-primary:hover {
  opacity: 0.95;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary.full {
  width: 100%;
}

.btn-secondary {
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  border: 1px solid #3f3f46;
  background: #18181b;
  color: #d4d4d8;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #27272a;
}

.btn-secondary.full {
  width: 100%;
}

.button-row {
  display: flex;
  gap: 0.75rem;
}

.button-row .btn-primary,
.button-row .btn-secondary {
  flex: 1;
}

/* Menu tabs */
.menu-tabs {
  display: flex;
  gap: 0.5rem;
}

.tab {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid #27272a;
  background: #09090b;
  color: #d4d4d8;
  font-size: 0.875rem;
  cursor: pointer;
}

.tab:hover {
  color: #fff;
}

.tab.active {
  border-color: rgba(252, 211, 77, 0.3);
  background: rgba(252, 211, 77, 0.1);
  color: #fde68a;
}

.menu-input {
  margin-top: 1rem;
}

.input-hint {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #71717a;
}

/* Dropzone */
.dropzone {
  display: block;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px dashed #3f3f46;
  background: rgba(9, 9, 11, 0.4);
  cursor: pointer;
  transition: border-color 0.15s;
}

.dropzone:hover {
  border-color: #71717a;
}

.dropzone.has-file {
  border-color: rgba(252, 211, 77, 0.5);
  background: rgba(252, 211, 77, 0.05);
}

.dropzone-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dropzone-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(252, 211, 77, 0.25), rgba(249, 115, 22, 0.2));
  font-size: 1.25rem;
}

.has-file .dropzone-icon {
  background: rgba(252, 211, 77, 0.2);
}

.dropzone-title {
  font-weight: 500;
}

.has-file .dropzone-title {
  color: #fde68a;
}

.dropzone-hint {
  font-size: 0.875rem;
  color: #a1a1aa;
}

.file-input {
  display: none;
}

/* Error box */
.error-box {
  padding: 1rem;
  border-radius: 0.75rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  font-size: 0.875rem;
}

.form-footer {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: #71717a;
}

/* Processing state */
.processing-state {
  max-width: 32rem;
  margin: 0 auto;
  padding: 6rem 1.5rem;
  text-align: center;
}

.processing-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(252, 211, 77, 0.2), rgba(249, 115, 22, 0.2));
  font-size: 2.5rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.processing-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.processing-text {
  margin-top: 0.5rem;
  color: #a1a1aa;
}

.progress-bar {
  margin-top: 2rem;
  height: 8px;
  border-radius: 9999px;
  background: #27272a;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #fcd34d, #f97316);
  transition: width 0.5s;
}

.progress-text {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #71717a;
}

/* Success state */
.success-state {
  max-width: 40rem;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(16, 185, 129, 0.2));
  font-size: 2.5rem;
}

.success-title {
  font-size: 1.875rem;
  font-weight: 600;
}

.success-text {
  margin-top: 0.5rem;
  color: #a1a1aa;
}

.success-text strong {
  color: #fcd34d;
  font-weight: 500;
}

.qr-section {
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #27272a;
  background: rgba(9, 9, 11, 0.6);
}

.qr-code {
  display: inline-block;
  padding: 1rem;
  background: #fff;
  border-radius: 1rem;
}

.qr-code img {
  width: 192px;
  height: 192px;
}

.qr-placeholder {
  width: 192px;
  height: 192px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a1a1aa;
}

.qr-hint {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #a1a1aa;
}

.share-section {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #27272a;
  background: rgba(9, 9, 11, 0.6);
  text-align: left;
}

.share-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #e4e4e7;
  margin-bottom: 0.75rem;
}

.share-row {
  display: flex;
  gap: 0.5rem;
}

.share-input {
  flex: 1;
  font-size: 0.875rem;
}

.action-buttons {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.categories-section {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #27272a;
  background: rgba(9, 9, 11, 0.6);
  text-align: left;
}

.categories-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #a1a1aa;
  margin-bottom: 0.75rem;
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid #27272a;
  background: #09090b;
  font-size: 0.875rem;
  color: #d4d4d8;
}

.expiration-notice {
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #71717a;
}

.expiration-notice a {
  color: #fcd34d;
}

.expiration-notice a:hover {
  color: #fde68a;
}

/* Error state */
.error-state {
  max-width: 32rem;
  margin: 0 auto;
  padding: 6rem 1.5rem;
  text-align: center;
}

.error-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: rgba(239, 68, 68, 0.2);
  font-size: 2.5rem;
}

.error-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.error-text {
  margin-top: 0.5rem;
  color: #fca5a5;
}

.error-state .btn-primary {
  margin-top: 2rem;
}
</style>
