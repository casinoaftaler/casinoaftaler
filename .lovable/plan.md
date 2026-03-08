

## Plan: Enterprise SEO Udvidelse – iPhone Guide + Mobil Casino Hub (+4.000 ord hver)

### Nuværende status

| Side | Linjer | Sektioner | Est. ord |
|------|--------|-----------|----------|
| `IPhoneCasinoGuide.tsx` | 1.057 | 13 (Intro → Hjælp) | ~3.600 |
| `MobilCasino.tsx` | 1.030 | 12 (Hvad er → Hjælp) | ~3.500 |

Begge skal udvides til 7.000+ ord.

---

### IPhoneCasinoGuide.tsx — Nye sektioner (~+4.000 ord)

Indsættes **før** sektion 12 (Ansvarligt Spil) som nye H2-sektioner:

1. **iOS Sikkerhedsarkitektur Deep-Dive** (`id="ios-sikkerhed-deep-dive"`)
   - Secure Enclave hardware-kryptering, App Transport Security (ATS), Keychain Services
   - iOS sandboxing-model og hvordan den isolerer casino-data
   - Sammenligning med Android-sikkerhedsmodellen (Knox vs. Secure Enclave)

2. **Battery Management & Performance-Optimering** (`id="batteri-optimering"`)
   - Low Power Mode-effekt: CPU-throttling %, GPU impact, netværksbegrænsning
   - Batteriforbrug pr. spiltype: tabel med slots, live casino, bordspil, game shows
   - Optimeringstips: baggrundsprocesser, skærmlysstyrke, adaptiv opladning
   - Thermal throttling: hvad sker når iPhone overophedes under lange sessioner

3. **Tilgængelighed (Accessibility) på iOS Casino** (`id="tilgaengelighed"`)
   - VoiceOver-kompatibilitet med casino-spil (hvad virker, hvad virker ikke)
   - Dynamic Type: skriftstørrelse-skalering i casino-webapps
   - Reduce Motion: effekt på slot-animationer
   - Switch Control og AssistiveTouch til motorisk handicappede spillere

4. **iOS Opdateringer & Casino-Kompatibilitet** (`id="ios-opdateringer"`)
   - Historisk tabel: iOS 14 → iOS 19, breaking changes for casino (WebKit, PWA)
   - Beta-risici: hvorfor du aldrig bør installere iOS-beta til casino
   - Automatisk opdatering vs. manuel: anbefalinger

5. **Fejlfinding – 10+ iPhone-Casino-Problemer** (`id="fejlfinding"`)
   - Struktureret liste: problem → årsag → løsning
   - Face ID virker ikke, spil loader ikke, lyd mangler, Safari crasher, etc.
   - Hvornår kontakte casino support vs. Apple support

6. **iCloud & Handoff** (`id="icloud-handoff"`)
   - Synkronisering af Safari-faner mellem iPhone og iPad/Mac
   - Hvad Handoff kan (og ikke kan) for casino-sessioner
   - iCloud Keychain: password-management for casino-konti

---

### MobilCasino.tsx (Hub) — Nye sektioner (~+4.000 ord)

Indsættes **før** sektion 10 (Ansvarligt Spil) som nye H2-sektioner:

1. **Teknisk Arkitektur bag Mobil Casino** (`id="teknisk-arkitektur"`)
   - HTML5 vs. Flash: den historiske overgang og hvorfor det ændrede alt
   - WebGL for 3D-slots, WebRTC for live casino, Service Workers for caching
   - Canvas API vs. DOM-baseret rendering i spilleautomater
   - WebAssembly: næste generation af casino-performance

2. **Netværk & Latency: WiFi vs. 4G vs. 5G** (`id="netvaerk-latency"`)
   - Performance-benchmark tabel: ping, jitter, pakketab pr. netværkstype
   - 5G mmWave vs. sub-6GHz: realistisk casino-performance i DK
   - VPN-påvirkning: latency-overhead og geo-blokering
   - Netværkskvalitet-anbefalinger pr. spiltype

3. **Mobil Casino UX-Analyse** (`id="ux-analyse"`)
   - Touch-targets: WCAG-minimumsstørrelse vs. casino-knapper
   - Gesture-navigation: swipe, pinch-to-zoom, long-press i casino-context
   - Haptic feedback: Taptic Engine i iOS, vibration API i Android
   - Portrait vs. landscape: spiltype-specifik analyse

4. **Sikkerhedsarkitektur i Dybden** (`id="sikkerhed-deep-dive"`)
   - TLS 1.3 handshake-flow for mobilcasino
   - Certificate pinning i casino-apps
   - Biometrisk autentificering: teknisk flow (Face ID → Keychain → session token)
   - Man-in-the-Middle-beskyttelse på offentlige WiFi-netværk

5. **Mobil Casino vs. Desktop – Komplet Sammenligning** (`id="mobil-vs-desktop"`)
   - 15+ parameter sammenlignings-tabel
   - Performance, sikkerhed, bekvemmelighed, spiludvalg, bonusser, betaling
   - Use-case scenarios: hvornår mobil er bedre, hvornår desktop vinder

6. **Fremtidens Mobil Casino** (`id="fremtiden"`)
   - AR/VR-integration (Apple Vision Pro casino)
   - AI-personalisering og ansvarligt spil-AI
   - Wearables: Apple Watch casino-notifikationer
   - 6G og edge computing: sub-1ms casino-oplevelser

---

### Teknisk implementering

- **2 filer opdateres** (ingen nye filer)
- `IPhoneCasinoGuide.tsx`: ~1.057 → ~1.700 linjer
- `MobilCasino.tsx`: ~1.030 → ~1.700 linjer
- Alle nye sektioner har unikke `id`-attributter for ToC-kompatibilitet
- Intern cross-linking til eksisterende cluster-sider og betalingsmetoder
- Bevarelse af eksisterende struktur: FAQ, schema, hero, AuthorMetaBar, AuthorBio

