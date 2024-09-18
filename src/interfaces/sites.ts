export interface NewSite {
  country?: string;
  name?: string;
  agent?: string | number;
}
export interface newSitesErrors {
  country?: string | null;
  name?: string | null;
  agent?: string | null;
}
