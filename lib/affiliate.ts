import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export type Affiliate = {
  id: string
  name: string
  email: string
  referral_code: string
  commission_rate: number
  referral_count: number
  total_earnings: number
  pending_earnings: number
  paid_earnings: number
};

export type AffiliateFormProps = {
  loginAndInit: () => Promise<void>;
  loading: boolean;
};

export const getAffiliateByEmail = async (email: string): Promise<Affiliate | null> => {
  const q = query(collection(db, "affiliates"), where("email", "==", email));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() as Omit<Affiliate, "id">};
};

export const createAffiliate = async (data: Omit<Affiliate, "id">): Promise<Affiliate> => {
  const docRef = await addDoc(collection(db, "affiliates"), data);
  return { id: docRef.id, ...data };
};