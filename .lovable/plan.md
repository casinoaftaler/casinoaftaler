

# Pip.dk Screenshots: /nye-casinoer/mitid + Strategisk Genbrug

## Oversigt

5 Pip.dk screenshots viser et komplet registreringsflow og er perfekte til MitID-guiden. De supplerer desuden det eksisterende Kapow-flow med et nyt brand, hvilket reducerer footprint-risiko.

## Del 1: Placering på /nye-casinoer/mitid (alle 5 screenshots)

Siden har i dag kun 1 screenshot (Betinia MitID). Med Pip.dk får den 6 i alt – god visuel densitet.

| Asset | Sektion | Size | Kontekst |
|---|---|---|---|
| `pip-cpr-nummer.webp` | "Sådan fungerer MitID" (trin-for-trin) | compact | Efter trin-listen, illustrerer CPR-verifikation |
| `pip-mitid-godkend.webp` | "Sådan fungerer MitID" (trin-for-trin) | compact | Efter CPR-screenshot, viser MitID-app godkendelse |
| `pip-kontooplysninger.webp` | "Onboarding-oplevelsen" (Tier 2/3 kort) | medium | Viser traditionelt registreringsflow med formularfelter |
| `pip-adgangskode.webp` | "Sikkerhed og databeskyttelse" | compact | Illustrerer adgangskode-oprettelse som ekstra sikkerhedslag |
| `pip-velkomstbonus.webp` | "MitID + Trustly Pay N Play" | medium | Viser bonusvalg efter registrering |

## Del 2: Strategisk genbrug (max 3 sider pr. asset)

Guardrail tillader 3 sider pr. screenshot. MitID-siden tæller som 1.

| Asset | Side 2 | Side 3 |
|---|---|---|
| `pip-mitid-godkend.webp` | `/mobil-casino` (MitID på mobil) | `/casino-uden-konto` (verifikation) |
| `pip-kontooplysninger.webp` | `/velkomstbonus` (registreringsflow) | — |
| `pip-velkomstbonus.webp` | `/casino-bonus` (bonusvalg ved oprettelse) | `/nye-casinoer/bonusser` |

`pip-cpr-nummer.webp` og `pip-adgangskode.webp` forbliver eksklusive til MitID-siden (unikke kontekster).

Dette giver Pip.dk som et nyt brand i rotation ved siden af Kapow, Betinia og Videoslots – ingen asset bruges på mere end 3 sider.

## Teknisk

- Konvertér 5 PNGs til WebP (ffmpeg, q82)
- Gem som `src/assets/screenshots/pip-*.webp`
- Importér i NyeCasinoerMitID.tsx + de 4 andre sider
- Unikke alt/caption per side-kontekst

