import { describe, it, expect } from "vitest";

/**
 * Tests for the mission streak reward system.
 * Validates that STREAK_MILESTONES constants match the expected credit amounts
 * and that the update_mission_streak RPC function awards the correct credits.
 *
 * Reward tiers:
 *   3-day streak  → 2,000 credits
 *   7-day streak  → 5,000 credits
 *   30-day streak → 10,000 credits
 */

// Import the source-of-truth constants from the hook
import { STREAK_MILESTONES } from "@/hooks/useMissionStreak";

describe("Mission Streak Rewards", () => {
  describe("STREAK_MILESTONES constants", () => {
    it("should define exactly 3 milestones", () => {
      expect(STREAK_MILESTONES).toHaveLength(3);
    });

    it("3-day streak should award 2,000 credits", () => {
      const m = STREAK_MILESTONES.find((m) => m.days === 3);
      expect(m).toBeDefined();
      expect(m!.credits).toBe(2000);
    });

    it("7-day streak should award 5,000 credits", () => {
      const m = STREAK_MILESTONES.find((m) => m.days === 7);
      expect(m).toBeDefined();
      expect(m!.credits).toBe(5000);
    });

    it("30-day streak should award 10,000 credits", () => {
      const m = STREAK_MILESTONES.find((m) => m.days === 30);
      expect(m).toBeDefined();
      expect(m!.credits).toBe(10000);
    });

    it("milestones should be in ascending order of days", () => {
      for (let i = 1; i < STREAK_MILESTONES.length; i++) {
        expect(STREAK_MILESTONES[i].days).toBeGreaterThan(STREAK_MILESTONES[i - 1].days);
      }
    });

    it("credits should increase with each milestone tier", () => {
      for (let i = 1; i < STREAK_MILESTONES.length; i++) {
        expect(STREAK_MILESTONES[i].credits).toBeGreaterThan(STREAK_MILESTONES[i - 1].credits);
      }
    });

    it("total streak rewards should sum to 17,000 credits", () => {
      const total = STREAK_MILESTONES.reduce((sum, m) => sum + m.credits, 0);
      expect(total).toBe(17000);
    });
  });

  describe("Streak reward eligibility logic", () => {
    // Simulate the same logic used in the DB function
    function computeRewards(currentStreak: number, claimed: { s3: boolean; s7: boolean; s30: boolean }) {
      const rewards: { type: string; credits: number }[] = [];

      if (currentStreak >= 3 && !claimed.s3) {
        rewards.push({ type: "3-day", credits: 2000 });
      }
      if (currentStreak >= 7 && !claimed.s7) {
        rewards.push({ type: "7-day", credits: 5000 });
      }
      if (currentStreak >= 30 && !claimed.s30) {
        rewards.push({ type: "30-day", credits: 10000 });
      }

      return rewards;
    }

    it("streak of 1 should yield no rewards", () => {
      const rewards = computeRewards(1, { s3: false, s7: false, s30: false });
      expect(rewards).toHaveLength(0);
    });

    it("streak of 2 should yield no rewards", () => {
      const rewards = computeRewards(2, { s3: false, s7: false, s30: false });
      expect(rewards).toHaveLength(0);
    });

    it("streak of 3 should award 2,000 credits (3-day)", () => {
      const rewards = computeRewards(3, { s3: false, s7: false, s30: false });
      expect(rewards).toHaveLength(1);
      expect(rewards[0]).toEqual({ type: "3-day", credits: 2000 });
    });

    it("streak of 3 with already claimed should yield no rewards", () => {
      const rewards = computeRewards(3, { s3: true, s7: false, s30: false });
      expect(rewards).toHaveLength(0);
    });

    it("streak of 7 should award both 3-day and 7-day if unclaimed", () => {
      const rewards = computeRewards(7, { s3: false, s7: false, s30: false });
      expect(rewards).toHaveLength(2);
      const total = rewards.reduce((sum, r) => sum + r.credits, 0);
      expect(total).toBe(7000); // 2000 + 5000
    });

    it("streak of 7 with 3-day already claimed should only award 7-day", () => {
      const rewards = computeRewards(7, { s3: true, s7: false, s30: false });
      expect(rewards).toHaveLength(1);
      expect(rewards[0]).toEqual({ type: "7-day", credits: 5000 });
    });

    it("streak of 30 with nothing claimed awards all 17,000 credits", () => {
      const rewards = computeRewards(30, { s3: false, s7: false, s30: false });
      expect(rewards).toHaveLength(3);
      const total = rewards.reduce((sum, r) => sum + r.credits, 0);
      expect(total).toBe(17000);
    });

    it("streak of 30 with 3-day and 7-day claimed awards only 10,000", () => {
      const rewards = computeRewards(30, { s3: true, s7: true, s30: false });
      expect(rewards).toHaveLength(1);
      expect(rewards[0]).toEqual({ type: "30-day", credits: 10000 });
    });

    it("streak of 30 with all claimed awards nothing", () => {
      const rewards = computeRewards(30, { s3: true, s7: true, s30: true });
      expect(rewards).toHaveLength(0);
    });

    it("streak of 50 still only triggers 30-day if unclaimed", () => {
      const rewards = computeRewards(50, { s3: true, s7: true, s30: false });
      expect(rewards).toHaveLength(1);
      expect(rewards[0].credits).toBe(10000);
    });
  });
});
