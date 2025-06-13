# 墨协 · DocNest

<div align="center">
    <img src="https://cetide-1325039295.cos.ap-chengdu.myqcloud.com/west/moxie/logo192.png" alt="DocNest Logo" width="160" height="160" />
    <p>✍️ 一个灵感涌现、团队共创的协作文档平台，聚焦实时协作 + 权限控制 + 知识管理</p>
    <p>📎 类似语雀 / Notion，专为技术团队与内容组织打造</p>
    <p>
        <a href="https://spring.io/projects/spring-boot">
            <img src="https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg" alt="Spring Boot">
        </a>
        <a href="https://mybatis.org/mybatis-3/">
            <img src="https://img.shields.io/badge/MyBatis--Plus-3.5+-blue.svg" alt="MyBatis-Plus">
        </a>
        <a href="https://www.mysql.com/">
            <img src="https://img.shields.io/badge/MySQL-8.x-blue.svg" alt="MySQL">
        </a>
        <a href="https://redis.io/">
            <img src="https://img.shields.io/badge/Redis-6+-red.svg" alt="Redis">
        </a>
        <a href="https://jwt.io/">
            <img src="https://img.shields.io/badge/JWT-auth-yellow.svg" alt="JWT">
        </a>
        <a href="https://maven.apache.org/">
            <img src="https://img.shields.io/badge/Maven-3.8+-orange.svg" alt="Maven">
        </a>
    </p>
</div>

---

## 🚀 项目简介

墨协（**DocNest**）是一款面向技术团队、内容组织、知识型企业打造的 **实时文档协作平台**，具备类语雀 / Notion 的使用体验，支持：

- 多人在线编辑协作
- 文档结构树管理
- 模板 & 标签体系
- 精细化权限控制
- 评论批注 / 审计日志

---

## 🎯 核心亮点

- 🧠 **领域驱动设计（DDD）架构**，分层清晰，职责明确
- 🧩 **文档协作模型完整**：知识库、文档、评论、版本
- 🔄 **实时编辑能力（WebSocket / OT）预留**
- 🔐 **权限控制粒度到文档级别**
- 📦 **模板与标签体系，让文档可复用可组织**
- 🔔 **通知中心 + Webhook 外部集成**
- 📜 **操作日志审计，保障内容可追踪**

---

## 🧱 技术选型

| 模块         | 技术栈                             | 图标 |
|--------------|------------------------------------|------|
| 架构模式     | 单体架构 + DDD + 分层设计          | 🧱    |
| 后端框架     | Spring Boot 3.x, MyBatis-Plus      | ☕️🔧 |
| 数据库       | MySQL 8.x                          | 🐬    |
| 缓存 / 消息  | Redis, RabbitMQ（预留）            | 🧠📬  |
| 安全认证     | Spring Security + JWT              | 🔒    |
| 编辑引擎     | Markdown（支持）, Draft.js（预留） | 📝🧾 |
| 构建工具     | Maven                              | 🛠️    |
| 国际化       | Spring MessageSource               | 🌐    |
| 托管平台     | GitHub / Gitee / GitLab            | 🐙 🐼 🦊 |

---

## 🗃️ 核心数据模型

| 表名                    | 说明                            |
|-------------------------|---------------------------------|
| `user`                  | 用户信息                        |
| `organization`          | 组织 / 团队信息                 |
| `knowledge_base`        | 知识库表                        |
| `document`              | 文档与目录表（树结构）          |
| `document_version`      | 文档版本记录                    |
| `document_comment`      | 评论 / 批注记录                 |
| `document_template`     | 模板信息表                      |
| `document_tag`          | 文档标签关联表                  |
| `document_permission`   | 文档权限控制表                  |
| `operation_log`         | 审计日志记录                    |
| `notification`          | 系统通知 / 协作提醒             |
| `webhook`               | 第三方通知配置表                |

---

## 🔮 未来规划

- ✅ WebSocket + CRDT 实时协作
- ✅ 文档锁定 / 草稿状态管理
- ✅ 全文搜索（基于 Elasticsearch）
- ✅ 企业微信、GitHub 登录集成
- ✅ 移动端适配优化
- ✅ 插件机制与第三方扩展支持

---

## 👨‍💻 项目维护者

| 姓名          | 角色              | 联系方式                   |
|---------------|-------------------|----------------------------|
| Heath Cetide  | 架构设计 & 主开发 | 19511899044@163.com        |

---

## 📄 License

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 协议开源，您可以自由使用、修改和分发本项目，欢迎 Star ⭐️ 和 Fork 🍴！

