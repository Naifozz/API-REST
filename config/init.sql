CREATE TABLE IF NOT EXISTS `LIVRE` (
  `ID_Livre` integer PRIMARY KEY AUTOINCREMENT,
  `Titre` varchar(255) NOT NULL,
  `ISBN` varchar(255) UNIQUE,
  `Annee_Publication` integer,
  `Nb_Pages` integer,
  `Editeur` varchar(255)
);

CREATE TABLE IF NOT EXISTS `AUTEUR` (
  `ID_Auteur` integer PRIMARY KEY AUTOINCREMENT,
  `Nom` varchar(255) NOT NULL,
  `Prenom` varchar(255),
  `Date_Naissance` date,
  `ID_Pays` integer
);

CREATE TABLE IF NOT EXISTS `PAYS`(
  `ID_Pays` integer PRIMARY KEY AUTOINCREMENT,
  `Nom` varchar(255)
);

CREATE TABLE IF NOT EXISTS `ECRITURE` (
  `ID_Auteur` integer,
  `ID_Livre` integer,
  `Role` varchar(255),
  PRIMARY KEY (`ID_Auteur`, `ID_Livre`),
  FOREIGN KEY (`ID_Auteur`) REFERENCES `AUTEUR` (`ID_Auteur`) ON DELETE CASCADE,
  FOREIGN KEY (`ID_Livre`) REFERENCES `LIVRE` (`ID_Livre`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `MEMBRE` (
  `ID_Membre` integer PRIMARY KEY AUTOINCREMENT,
  `Nom` varchar(255) NOT NULL,
  `Prenom` varchar(255) NOT NULL,
  `Email` varchar(255) UNIQUE,
  `Adresse` varchar(255),
  `Date_Inscription` timestamp DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS `EMPRUNT` (
  `ID_Emprunt` integer PRIMARY KEY AUTOINCREMENT,
  `ID_Membre` integer NOT NULL,
  `ID_Exemplaire` integer NOT NULL,
  `Date_Emprunt` date DEFAULT (CURRENT_DATE),
  `Date_Retour_Prevue` date,
  `Date_Retour_Effective` date,
  FOREIGN KEY (`ID_Membre`) REFERENCES `MEMBRE` (`ID_Membre`) ON DELETE CASCADE,
  FOREIGN KEY (`ID_Exemplaire`) REFERENCES `EXEMPLAIRE` (`ID_Exemplaire`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `CATEGORIE` (
  `ID_Categorie` integer PRIMARY KEY AUTOINCREMENT,
  `Nom` varchar(255) NOT NULL,
  `Description` varchar(255)
);

CREATE TABLE IF NOT EXISTS `CATEGORIE_LIVRE` (
  `ID_Categorie` integer,
  `ID_Livre` integer,
  PRIMARY KEY (`ID_Categorie`, `ID_Livre`),
  FOREIGN KEY (`ID_Categorie`) REFERENCES `CATEGORIE` (`ID_Categorie`) ON DELETE CASCADE,
  FOREIGN KEY (`ID_Livre`) REFERENCES `LIVRE` (`ID_Livre`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `EXEMPLAIRE` (
  `ID_Exemplaire` integer PRIMARY KEY AUTOINCREMENT,
  `ID_Livre` integer NOT NULL,
  `Etat` integer NOT NULL,
  `Disponibilite` boolean NOT NULL DEFAULT 0,
  `Date_Acquisition` date,
  FOREIGN KEY (`ID_Livre`) REFERENCES `LIVRE` (`ID_Livre`) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS set_date_retour_prevue
AFTER INSERT ON EMPRUNT
FOR EACH ROW
BEGIN
    UPDATE EMPRUNT
    SET Date_Retour_Prevue = DATE(NEW.Date_Emprunt, '+15 days')
    WHERE ID_Emprunt = NEW.ID_Emprunt;
END;

CREATE INDEX IF NOT EXISTS `LIVRE_index_0` ON `LIVRE` (`Titre`);
CREATE INDEX IF NOT EXISTS `AUTEUR_index_0` ON `AUTEUR` (`Nom`);
CREATE INDEX IF NOT EXISTS `MEMBRE_index_0` ON `MEMBRE` (`Email`);