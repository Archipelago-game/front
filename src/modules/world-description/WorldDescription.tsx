import { Box, Typography, Card, CardContent, Grid, Chip } from "@mui/material";

export default function WorldDescription() {
  const worldData = {
    subtitle: "Тёмное место",
    description:
      "Мир, окруженный густым туманом. Мир, где солнце встаёт из чёрных вод бездонного океана. Где не светят звёзды в ночном небе. Где каждое путешествие сквозь безучастную водную гладь, по которой раскидано множество больших и малых островов, может стать последним.",
    setting: "НРИ сеттинг с элементами мистики и тайн",
    system: "2d20",
    features: [
      "Многообразие возможностей для разных сюжетов и героев",
      "Тайны и секреты как основа мира",
      "Неопределенность и противоречия в информации",
      "Живой и меняющийся мир",
      "Реальность последствий и смертей персонажей",
    ],
    geography: {
      description:
        "Архипелаг состоит из множества больших и малых островов, разбросанных по бескрайним водам океана",
      characteristics: [
        "Густой туман окружает весь мир",
        "Чёрные воды бездонного океана",
        "Отсутствие звёзд в ночном небе",
        "Опасные путешествия между островами",
      ],
    },
    gameMechanics: {
      system: "2d20",
      dice: [
        "К20 (куб с 20 гранями) - основной куб системы",
        "К6 (куб с шестью гранями) - для дополнительных механик",
      ],
      standardRoll: "Два двадцатигранных куба",
      resources: [
        "Фишки/токены для отслеживания ресурсов",
        "Бумага с карандашом для записей",
        "Большое количество шестигранных кубов",
      ],
    },
    characters: {
      type: "Выдающиеся личности",
      description:
        "Персонажи в мире архипелага — выдающиеся индивиды, незаурядные личности, способные к незаурядным же поступкам",
      features: [
        "Не обязаны быть добропорядочными или здравомыслящими",
        "Центр собственной истории, но не центр всего мира",
        "Действуют в живом и меняющемся мире",
        "Подвержены реальным последствиям своих действий",
      ],
    },
    worldPhilosophy: {
      principles: [
        "Играй в дурацкие игры — получай дурацкие призы",
        "Мир не слишком дружелюбен",
        "Смерть и неудачи — неотъемлемая часть приключений",
        "Песочница для историй без предопределённого пути",
      ],
      information: {
        reliability: "Информация может быть противоречива",
        sources: "Источники ненадёжны",
        details: "Детали могут быть искажены",
        note: "Так и задумано",
      },
    },
    targetAudience: {
      description: "Для игроков, знакомых с настольными ролевыми играми",
      advice: [
        "Отказаться от любых ожиданий",
        "Быть открытыми к новому",
        "Принять мир таким, какой он есть — загадочным, опасным и увлекательным",
      ],
    },
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        {worldData.subtitle}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Описание мира
          </Typography>
          <Typography variant="body1" paragraph>
            {worldData.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
            <Chip
              label={`Сеттинг: ${worldData.setting}`}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`Система: ${worldData.system}`}
              color="secondary"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Особенности мира */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Особенности мира
              </Typography>
              {worldData.features.map((feature, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  • {feature}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* География */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                География
              </Typography>
              <Typography variant="body2" paragraph>
                {worldData.geography.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Характеристики:
              </Typography>
              {worldData.geography.characteristics.map(
                (characteristic, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    • {characteristic}
                  </Typography>
                ),
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Игровая механика */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Игровая механика
              </Typography>
              <Typography variant="body2" paragraph>
                Система: {worldData.gameMechanics.system}
              </Typography>
              <Typography variant="body2" paragraph>
                Стандартный бросок: {worldData.gameMechanics.standardRoll}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Типы кубов:
              </Typography>
              {worldData.gameMechanics.dice.map((die, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  • {die}
                </Typography>
              ))}
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Необходимые ресурсы:
              </Typography>
              {worldData.gameMechanics.resources.map((resource, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  • {resource}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Персонажи */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Персонажи игроков
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {worldData.characters.type}
              </Typography>
              <Typography variant="body2" paragraph>
                {worldData.characters.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Особенности:
              </Typography>
              {worldData.characters.features.map((feature, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  • {feature}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Философия мира */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Философия мира
              </Typography>
              <Typography variant="h6" gutterBottom>
                Принципы:
              </Typography>
              {worldData.worldPhilosophy.principles.map((principle, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  • {principle}
                </Typography>
              ))}
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Информация:
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • {worldData.worldPhilosophy.information.reliability}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • {worldData.worldPhilosophy.information.sources}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • {worldData.worldPhilosophy.information.details}
              </Typography>
              <Chip
                label={worldData.worldPhilosophy.information.note}
                color="warning"
                size="small"
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Целевая аудитория */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Для кого эта игра?
              </Typography>
              <Typography variant="body2" paragraph>
                {worldData.targetAudience.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Советы для игроков:
              </Typography>
              {worldData.targetAudience.advice.map((advice, index) => (
                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                  • {advice}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
