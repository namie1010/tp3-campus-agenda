
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";

// 1. Définition du type Evenement
type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

// 2. Données des événements
const evenements: Evenement[] = [
  {
    id: "E01",
    titre: "Atelier React",
    categorie: "Atelier",
    capacite: 25,
    inscrits: 25,
  },
  {
    id: "E02",
    titre: "Conférence IA",
    categorie: "Conférence",
    capacite: 70,
    inscrits: 52,
  },
  {
    id: "E03",
    titre: "Sécurité mobile",
    categorie: "Atelier",
    capacite: 20,
    inscrits: 17,
  },
  {
    id: "E04",
    titre: "Design UI",
    categorie: "Atelier",
    capacite: 18,
    inscrits: 9,
  },
  {
    id: "E05",
    titre: "Forum projets",
    categorie: "Rencontre",
    capacite: 50,
    inscrits: 49,
  },
  {
    id: "E06",
    titre: "Découverte Git",
    categorie: "Atelier",
    capacite: 24,
    inscrits: 24,
  },
];

// 3. Définition des statuts
type Statut = "Complet" | "Presque complet" | "Ouvert";

// 4. Calcul des places restantes
function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}

// 5. Détermination du statut
function statutEvenement(e: Evenement): Statut {
  const places = placesRestantes(e);

  if (places === 0) {
    return "Complet";
  } else if (places <= 3) {
    return "Presque complet";
  } else {
    return "Ouvert";
  }
}

// 6. Calcul des statistiques

const totalEvenements = evenements.length;

const evenementsComplets = evenements.filter(
  (e) => placesRestantes(e) === 0
).length;

const evenementsAvecPlaces = evenements.filter(
  (e) => placesRestantes(e) > 0
).length;

const totalPlacesRestantes = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);

// 7. Filtrer les ateliers disponibles

const ateliersDisponibles = evenements.filter(
  (e) =>
    e.categorie === "Atelier" &&
    placesRestantes(e) > 0
);

// 8. Mode d'affichage

const mode: "tous" | "ateliers" = "tous";

const evenementsAffiches =
  mode === "tous"
    ? evenements
    : ateliersDisponibles;

// 9. Composant BadgeEtat

type BadgeEtatProps = {
  statut: Statut;
};

function BadgeEtat({ statut }: BadgeEtatProps) {
  let couleur = "#DFF2E1";

  if (statut === "Complet") {
    couleur = "#FFDADA";
  } else if (statut === "Presque complet") {
    couleur = "#FFE7C2";
  }

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: couleur },
      ]}
    >
      <Text style={styles.badgeText}>
        {statut}
      </Text>
    </View>
  );
}

type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  const places = placesRestantes(evenement);
  const statut = statutEvenement(evenement);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.eventTitle}>
            {evenement.titre}
          </Text>

          <Text style={styles.category}>
            {evenement.categorie}
          </Text>
        </View>

        <BadgeEtat statut={statut} />
      </View>

      <Text style={styles.places}>
        {places} places restantes
      </Text>

      <Text style={styles.capacity}>
        {evenement.inscrits} / {evenement.capacite} inscrits
      </Text>
    </View>
  );
}

type BlocStatistiqueProps = {
  libelle: string;
  nombre: number;
};

function BlocStatistique({
  libelle,
  nombre,
}: BlocStatistiqueProps) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statNumber}>
        {nombre}
      </Text>

      <Text style={styles.statLabel}>
        {libelle}
      </Text>
    </View>
  );
}

export default function App() {
  const statistiques = [
    { libelle: "Événements", nombre: totalEvenements },
    { libelle: "Complets", nombre: evenementsComplets },
    { libelle: "Avec des places", nombre: evenementsAvecPlaces },
    { libelle: "Places libres", nombre: totalPlacesRestantes },
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>
          CampusAgenda
        </Text>

        <Text style={styles.subtitle}>
          Événements du campus
        </Text>
      </View>

      {/* Statistiques */}
      <View style={styles.statsContainer}>
        {statistiques.map((stat) => (
          <BlocStatistique
            key={stat.libelle}
            libelle={stat.libelle}
            nombre={stat.nombre}
          />
        ))}
      </View>

      {/* Titre selon le mode */}
      <Text style={styles.modeTitle}>
        {mode === "tous"
          ? "Tous les événements"
          : "Ateliers disponibles"}
      </Text>

      {/* Liste des événements */}
      <FlatList
        data={evenementsAffiches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Aucun événement à afficher.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    paddingHorizontal: 16,
  },

  header: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#202C45",
  },

  subtitle: {
    fontSize: 15,
    color: "#7B8495",
    marginTop: 5,
  },

  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statBox: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  statNumber: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#4263EB",
  },

  statLabel: {
    fontSize: 12,
    color: "#7B8495",
    marginTop: 5,
    textAlign: "center",
  },

  modeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#202C45",
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  titleContainer: {
    flex: 1,
    marginRight: 8,
  },

  eventTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#202C45",
  },

  category: {
    fontSize: 13,
    color: "#8992A3",
    marginTop: 5,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#374151",
  },

  places: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4263EB",
    marginTop: 16,
  },

  capacity: {
    fontSize: 12,
    color: "#8992A3",
    marginTop: 5,
  },

  listContent: {
    paddingBottom: 25,
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  emptyText: {
    fontSize: 15,
    color: "#7B8495",
    textAlign: "center",
  },
});

