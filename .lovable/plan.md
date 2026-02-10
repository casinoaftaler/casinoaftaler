

# Rename "Spins" to "Credits" og daglig nulstillingstidspunkt

## Oversigt
Alle steder i brugergrænsefladen hvor "spins" bruges som valuta/saldo bliver omdøbt til "credits". Selve bonus-spins i bonus-runder (gratis spins i spillet) forbliver som "spins", da det er et gameplay-begreb.

Derudover forklares den nuværende nulstillingslogik nedenfor.

---

## Daglig nulstillingslogik (svar)

Den nuværende kode bruger `new Date().toISOString().split("T")[0]` til at bestemme "i dag". `toISOString()` returnerer altid **UTC-tid**, hvilket betyder at dagsskiftet sker ved **midnat UTC (01:00 dansk tid om vinteren, 02:00 om sommeren)**.

Der er altsa IKKE UTC+1 - det er ren UTC. Hvis du onsker at dagsskiftet sker ved midnat dansk tid, skal vi tilpasse dato-logikken.

---

## Filerne der skal opdateres

### Tekstandringer ("spins" -> "credits")

1. **`src/components/slots/SpinsRemaining.tsx`**
   - `"/{maxSpins} spins i dag"` -> `"/{maxSpins} credits i dag"`
   - `"Daglige spins + profilbelonninger"` -> `"Daglige credits + profilbelonninger"`
   - `"+{bonusSpinsPermanent} bonus spins fra profil"` -> `"+{bonusSpinsPermanent} bonus credits fra profil"`
   - `"community bonus spins tilgangelige"` -> `"community bonus credits tilgangelige"`

2. **`src/components/slots/BetControls.tsx`**
   - `"/{maxSpins} spins"` -> `"/{maxSpins} credits"`

3. **`src/components/slots/AutospinRow.tsx`**
   - Dropdown: `` `${count} spins` `` -> `` `${count} credits` ``

4. **`src/components/ProfileCompletionPrompt.tsx`**
   - `"Fa 20 ekstra spins hver dag!"` -> `"Fa 20 ekstra credits hver dag!"`
   - `"20 gratis spins ekstra"` -> `"20 gratis credits ekstra"`

5. **`src/components/profile/ProfileRewardsProgress.tsx`**
   - `"/ {maxSpins} spins"` -> `"/ {maxSpins} credits"`
   - `"+{SPINS_PER_SECTION} spins"` -> `"+{SPINS_PER_SECTION} credits"`

6. **`src/components/profile/ProfileCommunityBonusSection.tsx`**
   - `"Bonus Spins (Community)"` -> `"Bonus Credits (Community)"`
   - `"+50 bonus spins per klip"` -> `"+50 bonus credits per klip"`
   - `"Aktiver Spins ({remaining} tilgangelige)"` -> `"Aktiver Credits ({remaining} tilgangelige)"`

7. **`src/components/profile/ActivateBonusSpinsDialog.tsx`**
   - `"Aktiver Bonus Spins"` -> `"Aktiver Bonus Credits"`
   - `"bonus spins"` -> `"bonus credits"`
   - `"spin-saldo"` -> `"credit-saldo"`
   - `"Aktiverede spins tilfojes..."` -> `"Aktiverede credits tilfojes..."`
   - `"Aktiver {amount} spins"` -> `"Aktiver {amount} credits"`

8. **`src/components/SpinManagementSection.tsx`**
   - `"Giv Spins til Brugere"` -> `"Giv Credits til Brugere"`
   - `"Giv eller fjern spins"` -> `"Giv eller fjern credits"`
   - Alle "spins"-labels i UI

9. **`src/components/slots/SlotStatsResetSection.tsx`**
   - `"Nulstil Alle Spins"` -> `"Nulstil Alle Credits"`
   - Alle beskrivelser der naevner "spins"

10. **`src/components/slots/SlotLeaderboard.tsx`**
    - Kolonnelabel `"spins"` -> `"credits"` (under stats)

11. **`src/hooks/useCommunityBonusSpins.ts`**
    - Toast: `"bonus spins aktiveret"` -> `"bonus credits aktiveret"`
    - Error toast: `"aktivere spins"` -> `"aktivere credits"`

12. **`src/components/slots/BonusCompleteScreen.tsx`**
    - `"GRATIS SPINS"` forbliver - dette er gameplay-begrebet for bonus-runder

13. **`src/components/slots/PayTable.tsx`**
    - `"3+ Scatter giver 10 gratis spins"` forbliver - gameplay-kontekst

14. **`src/components/profile/ProfilePlayStyleSection.tsx`**
    - `"Jagter bonusser og free spins"` forbliver - det beskriver en spillestil

---

## Teknisk sektion

### Hvad andres IKKE
- Database-kolonnenavne (`spins_remaining`, `bonus_spins_permanent`, `slot_spins` tabel) forbliver uaendrede - det er kun UI-tekst der andres
- Hook-navne og variabelnavne i kode forbliver (`useSlotSpins`, `spinsRemaining` osv.) for at undga unodvendige refaktoreringer
- Gameplay-termer som "free spins" i bonus-runder og pay table forbliver
- Edge functions forbliver uaendrede

### Antal filer: ~11 filer med rene tekstandringer
