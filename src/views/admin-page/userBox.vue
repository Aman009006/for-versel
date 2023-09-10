<template>
  <div class="placeholderInfoBoxAdmin">
    <el-row>
      <h1 style="font-size: 18px">Benutzerverwaltung</h1>
      <span>
        <p style="font-size: 14px">
          Administratoren haben Zugriff auf Funktionen zur Erstellung, Bearbeitung und Löschung von Benutzerkonten. Sie können Benutzernamen, E-Mail-Adressen und Passwörter verwalten.
            Es ist möglich Konten zu sperren oder entsperren.
        </p>

        <p style="font-size: 14px">
          Die Übersicht bietet eine nahtlose Verwaltung der Benutzerkonten, um einen reibungslosen Ablauf im System zu gewährleisten.
        </p>

      </span>
    </el-row>
  </div>
</template>

<style lang="scss">
@import "@/styles/variables.module.scss";

.placeholderInfoBoxAdmin {
  background-color: $hsag-lightgrey;
  padding: 15px 25px;
  margin-bottom: 20px;

  h1 {
    margin-top: 0px;
    font-size: 18px;
    color: #303133;
  }
}

.text {
  font-size: 14px;
}
</style>
