/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "appetizers" | "mains" | "drinks" | "desserts";
  tags: string[]; // e.g. "Signature", "Spicy", "Chef's Special", "Gluten-Free"
  spiciness?: number; // 0-3
}

export interface BanquetTheme {
  id: string;
  name: string;
  description: string;
  pricePerGuest: number;
  image: string;
  color: string;
  highlights: string[];
}

export interface CateringPackage {
  id: string;
  name: string;
  pricePerPlate: number;
  description: string;
  includes: string[];
  features: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  tag: string;
  likes: number;
}

export interface BanquetEstimate {
  guestCount: number;
  themeId: string;
  packageId: string;
  eventType: string;
  needsCake: boolean;
  needsPhotography: boolean;
  needsSoundSystem: boolean;
}
