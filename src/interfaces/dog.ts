import { User } from "./user";

// Tilpasset Product-interface for hundeprodukter
export interface Dog extends Document {
  name: string;            // Navnet på hunden (f.eks. "Buddy")
  breed: string;           // Rasen på hunden (f.eks. "Labrador")
  age: number;             // Alderen på hunden (f.eks. 2 år)
  description?: string;    // Beskrivelse av hunden (f.eks. "En vennlig og energisk hund") - valgfritt
  imageURL?: string;       // URL til bildet av hunden - valgfritt
  price: number;           // Prisen på hunden (hvis aktuelt, kan brukes for å representere en adopsjonskostnad)
  stock: number;           // Antall hunder tilgjengelig (kan være 1 hvis kun én tilgjengelig)
  discount: boolean;       // Om det er rabatt på hunden
  discountPct: number;     // Rabattprosent (hvis discount er true)
  isHidden: boolean;       // Om hunden skal være skjult i visningen (kan brukes til å skjule hunder midlertidig)
  _createdBy: User["id"];  // ID til brukeren som opprettet hunden (sannsynligvis en admin)
  _createdAt: Date;        // Datoen hunden ble lagt til (f.eks. når informasjonen ble registrert)
}

