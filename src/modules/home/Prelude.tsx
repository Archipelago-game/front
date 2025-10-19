import { Box, Typography, Paper } from "@mui/material";

export default function Prelude() {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        maxWidth: "800px",
        mx: "auto",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        🌊 Предисловие
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          🌊 О мире Архипелага
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Архипелаг</strong> — это сеттинг для НРИ, который я создал, когда был в поисках того, что мне хотелось бы поводить. Архипелаг не претендует на какую-то особенную уникальность, являясь, по сути, компиляцией идей, механик, и подходов из разных сеттингов, систем, культур и произведений. Если вам кажется, что "это было в симпсонах", то это, скорее всего, так.
        </Typography>

        <Typography variant="body1" paragraph>
          В то же время, этот сеттинг оригинальный хотя бы тем, что лёг на мои собственные литературные наработки. В любом случае, Архипелаг, или "тёмное место", как он ещё назывался в рабочем варианте, вышел увлекательным.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          🎭 Многообразие возможностей
        </Typography>
        <Typography variant="body1" paragraph>
          Это сеттинг, в котором найдётся место самым разным сюжетам, героям и приключениям. Большой частью архипелага являются его <strong>тайны и секреты</strong>.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          ❓ Неопределенность и противоречия
        </Typography>
        <Typography variant="body1" paragraph>
          Не ждите, что всё будет понятно, последовательно, или хотя бы логично. Информация может быть противоречива, источники ненадёжны, а детали искажены. <strong>Так и задумано.</strong>
        </Typography>

        <Typography variant="body1" paragraph>
          Пытливый ум игрока может согреть мысль о том, что "вся правда" известна, и заранее написана. Она существует, до неё можно добраться, и это, на мой взгляд, не менее увлекательно, чем кидаться кубиками в ворогов.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          🌅 Добро пожаловать в Архипелаг
        </Typography>

        <Typography variant="body1" paragraph>
          Добро пожаловать, Игрок, в мир, окруженный густым туманом. Мир, где солнце встаёт из чёрных вод бездонного океана. Где не светят звёзды в ночном небе. Где каждое путешествие сквозь безучастную водную гладь, по которой раскидано множество больших и малых островов, может стать последним.
        </Typography>

        <Typography variant="h6" component="p" align="center" sx={{ fontWeight: "bold", mt: 2 }}>
          Добро пожаловать в Архипелаг.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          🎲 Основы игры
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          Что такое "Архипелаг"?
        </Typography>
        <Typography variant="body1" paragraph>
          "Архипелаг" — это <strong>НРИ</strong> (настольная ролевая игра). В ней есть:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" variant="body1">
            <strong>Мастер</strong> (он же рассказчик), который играет "за мир"
          </Typography>
          <Typography component="li" variant="body1">
            <strong>Игроки</strong>, которые играют за своих персонажей
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Эта книга предназначена, в первую очередь, для игроков, а значит и сосредоточится на том, что им необходимо знать.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          🎯 Система 2d20
        </Typography>
        <Typography variant="body1" paragraph>
          Система, на которой стоит "Архипелаг" называется <strong>2d20</strong>. В ней используется всего два вида кубов:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" variant="body1">
            <strong>К20</strong> (куб с 20 гранями)
          </Typography>
          <Typography component="li" variant="body1">
            <strong>К6</strong> (куб с шестью гранями)
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          Стандартный бросок — это два двадцатигранных куба. Отсюда и название.
        </Typography>

        <Paper sx={{ p: 2, backgroundColor: "#e3f2fd", borderLeft: "4px solid #2196f3" }}>
          <Typography variant="body2" sx={{ fontStyle: "italic" }}>
            💡 Совет: Шестигранными кубами лучше запастись в большом количестве. Также могут потребоваться фишки/токены для того, чтобы следить за разными ресурсами, и бумага с карандашём для записей.
          </Typography>
        </Paper>

        <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 2 }}>
          🔥 Гибкость системы
        </Typography>
        <Typography variant="body1" paragraph>
          2d20 — очень гибкая система, позволяющая отразить многие аспекты персонажей игроков.
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          👥 Персонажи игроков
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          Выдающиеся личности
        </Typography>
        <Typography variant="body1" paragraph>
          Персонажи в мире архипелага — <strong>выдающиеся индивиды</strong>, незаурядные личности, способные к незаурядным же поступкам. Они не должны быть добропорядочными, или хотя бы просто здравомыслящими — вы можете создавать и отыгрывать, что вашей душе угодно.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          ⚠️ Суровость мира
        </Typography>
        <Typography variant="body1" paragraph>
          Но стоит отметить, что мир Архипелага не слишком дружелюбен, и чаще следует принципу <strong>"играй в дурацкие игры — получай дурацкие призы"</strong> чем нет.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          🌍 Живой мир
        </Typography>
        <Typography variant="body1" paragraph>
          Персонажи игроков, безусловно, являются центром собственной истории, но ни в коем случае не являются центром всего мира. Мир архипелага полон событий, больших и малых, и каждая кампания или игра в мире архипелага происходит в живом и меняющемся мире, который реагирует на действия или бездействия персонажей.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          🎪 Песочница для историй
        </Typography>
        <Typography variant="body1" paragraph>
          Архипелаг задумывался как <strong>песочница для историй</strong>, а значит не стоит ожидать, что мир вокруг вас сложится дорогой из жёлтого кирпича от начала приключений к великому и славному будущему.
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          💀 Реальность последствий
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Смерть персонажей игроков, их неудачи</strong> — неотъемлемая часть приключений в мире "Архипелага".
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          🎯 Для кого эта игра?
        </Typography>

        <Typography variant="body1" paragraph>
          Ожидается, что игроки в "Архипелаг" уже знакомы хотя бы в общих чертах с настольными ролевыми играми, и для абсолютных новичков "Архипелаг" может показаться откровенно недружелюбным.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Для таких игроков я могу лишь посоветовать:</strong>
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" variant="body1">
            Отказаться от любых ожиданий, которые у них могли быть
          </Typography>
          <Typography component="li" variant="body1">
            Быть открытыми к новому
          </Typography>
          <Typography component="li" variant="body1">
            Принять мир таким, какой он есть — загадочным, опасным и увлекательным
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
