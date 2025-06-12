// App.js
import React, { useState } from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Dropdown } from "./components/Dropdown";
import { Modal } from "./components/Modal";
import { Card } from "./components/Card";
import { Switch } from "./components/Switch";
import { MultiSelect } from "./components/MultiSelect";
import { RadioGroup } from "./components/RadioGroup";
import { RangeSlider } from "./components/RangeSlider";
import { FloatingPanelDnd } from "./components/FloatingPanelDnd";
import { Slider } from "./components/Slider";
import { Textarea } from "./components/Textarea";
import { Dialog, DialogTrigger, DialogContent } from "./components/Dialog";
import { BlockEditor } from "./components/BlockEditor";
import { Tooltip, TooltipTrigger, TooltipContent } from "./components/Tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/Tabs";
import { BlockEditorMultiSelect } from "./components/BlockEditorMultiSelect";
import { NestedOutlineEditor } from "./components/NestedOutlineEditor";
import { Popover } from "./components/Popover";
import { ComponentInsertEditor } from "./components/ComponentInsertEditor";

import {
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
} from "./components/Toast";
import {Mail, Settings, Info, Bell, EditIcon, CopyIcon, TrashIcon, Smartphone, Home, User} from "lucide-react";
import { Select } from "./components/Select";
import {Autocomplete} from "./components/Autocomplete";
import {Combobox} from "./components/Combobox";
import {FileUpload} from "./components/FileUpload";
import {TimeRangePicker} from "./components/TimeRangePicker";
import {TimePicker} from "./components/TimePicker";
import {DateRangePicker} from "./components/DateRangePicker";
import {DatePicker} from "./components/DatePicker";
import { nanoid } from "nanoid";
import {HoverCard} from "./components/HoverCard";
import {ContextMenu} from "./components/ContextMenu";
import {AlertDialog} from "./components/AlertDialog";
import { useNotification } from "./components/NotificationCenter";
import {Avatar} from "./components/Avatar";
import { Badge } from "./components/Badge";
import {ProgressBar} from "./components/ProgressBar";
import {Spinner} from "./components/Spinner";
import {SkeletonAvatar, SkeletonCard, SkeletonText, Skeleton} from "./components/Skeleton";
import {Chip} from "./components/Chip";
import {DataTable} from "./components/DataTable";
import {Chart} from "./components/Chart";
import {Timeline} from "./components/Timeline";
import {Pagination} from "./components/Pagination";
import {Breadcrumbs} from "./components/Breadcrumbs";
import {Drawer} from "./components/Drawer";
import {Navbar} from "./components/Navbar";
import {Stepper} from "./components/Stepper";
import {Accordion} from "./components/Accordion";
import {SiderMenu} from "./components/SiderMenu";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

import { useNavigate } from "react-router-dom";
import {CommandPalette} from "./components/CommandPalette";
import {ColorPicker} from "./components/ColorPicker";
import {JSONViewer} from "./components/JSONViewer";
const initialItems = [
    { id: nanoid(), title: "Heading 1", level: 0 },
    { id: nanoid(), title: "Subheading 1.1", level: 1 },
    { id: nanoid(), title: "Subheading 1.2", level: 1 },
    { id: nanoid(), title: "Sub-subheading 1.2.1", level: 2 },
    { id: nanoid(), title: "Heading 2", level: 0 },
];

const SelectOPTIONS = [
    { label: "JavaScript", value: "js" },
    { label: "TypeScript", value: "ts" },
    { label: "Python", value: "python" },
];

const RadioOPTIONS = [
    { label: "男", value: "male" },
    { label: "女", value: "female" },
    { label: "其他", value: "other" },
];

const OPTIONS = [
    { label: "苹果", value: "apple" },
    { label: "香蕉", value: "banana" },
    { label: "橙子", value: "orange" },
    { label: "西瓜", value: "watermelon" },
];


const columns = [
    { label: "姓名", key: "name" },
    { label: "年龄", key: "age" },
    { label: "状态", key: "status", render: (val) => <span className="text-green-600">{val}</span> },
];

const allData = [
    { name: "张三", age: 28, status: "活跃" },
    { name: "李四", age: 34, status: "正常" },
    { name: "王五", age: 22, status: "禁用" },
    { name: "赵六", age: 45, status: "活跃" },
    { name: "钱七", age: 31, status: "正常" },
    { name: "孙八", age: 29, status: "禁用" },
    { name: "周九", age: 27, status: "正常" },
    { name: "吴十", age: 33, status: "活跃" },
    { name: "郑十一", age: 26, status: "禁用" },
    { name: "王十二", age: 39, status: "正常" },
    { name: "刘十三", age: 24, status: "活跃" },
    { name: "赵十四", age: 30, status: "正常" },
];

function App() {
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.ceil(allData.length / pageSize);
    const pagedData = allData.slice((page - 1) * pageSize, page * pageSize);
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [gender, setGender] = useState("male");
    const [selectedFruits, setSelectedFruits] = useState([]);
    const [range, setRange] = useState([20, 80]);
    const [volume, setVolume] = useState(50);
    const [content, setContent] = useState("");
    const [language, setLanguage] = useState("");
    const [selected, setSelected] = useState(""); // Combobox 的选中值
    const [tech, setTech] = useState("");         // Autocomplete 的选中值
    const [date, setDate] = useState(null);
    const [dateRange, setDateRange] = useState([]);
    const [time, setTime] = useState(null);
    const [timeRange, setTimeRange] = useState([]);
    const [items, setItems] = useState(initialItems);
    const { addNotification } = useNotification();
    const [step, setStep] = useState(0);
    const navigate = useNavigate();
    useKeyboardShortcuts([
        {
            keyCombo: "ctrl+s",
            callback: () => console.log("保存成功！"),
        },
        {
            keyCombo: "shift+n",
            callback: () => console.log("新建项目！"),
        },
        {
            keyCombo: "alt+enter",
            callback: () => console.log("特殊动作触发！"),
        },
    ]);

    return (
        <ToastProvider swipeDirection="right">

            <JSONViewer
                data={{
                    user: { name: "张三", age: 28 },
                    roles: ["admin", "editor"],
                    active: true,
                }}
                editable={true}
                onEdit={(e) => console.log("JSON 被修改", e)}
            />
            <ColorPicker
                label="主题颜色"
                color="#6366f1"
                onChange={(hex) => console.log("选择颜色:", hex)}
            />

            {/*Ctrl + K*/}
            <CommandPalette
                themeColor="violet"
                actions={[
                    {
                        label: "跳转首页",
                        icon: <Home className="w-4 h-4" />,
                        shortcut: ["G", "H"],
                        onTrigger: () => navigate("/"),
                    },
                    {
                        label: "打开用户管理",
                        icon: <User className="w-4 h-4" />,
                        shortcut: ["G", "U"],
                        onTrigger: () => navigate("/users"),
                    },
                ]}
            />
            {/*<BrowserRouter>*/}
            {/*    <div className="flex h-screen">*/}
            {/*        <SiderMenu />*/}
            {/*        <div className="flex-1 flex flex-col">*/}
            {/*            <Navbar />*/}
            {/*            <main className="flex-1 p-4 overflow-auto">*/}
            {/*                <Routes>*/}
            {/*                    <Route path="/dashboard" />*/}
            {/*                    <Route path="/users" />*/}
            {/*                    ...*/}
            {/*                </Routes>*/}
            {/*            </main>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</BrowserRouter>*/}
            {/*<Accordion*/}
            {/*    themeColor="violet"*/}
            {/*    allowMultiple={false}*/}
            {/*    defaultActive={[0]}*/}
            {/*    items={[*/}
            {/*        { title: "什么是Accordion组件？", content: "这是一个可折叠的内容区域，用于展示隐藏信息。" },*/}
            {/*        { title: "支持多个同时展开吗？", content: "可以，设置 allowMultiple 为 true 即可。" },*/}
            {/*        { title: "支持暗黑模式吗？", content: "当然支持！" },*/}
            {/*    ]}*/}
            {/*/>*/}
            {/*<Stepper*/}
            {/*    steps={[*/}
            {/*        { title: "步骤一", description: "填写基本信息" },*/}
            {/*        { title: "步骤二", description: "上传资料" },*/}
            {/*        { title: "步骤三", description: "确认提交" },*/}
            {/*    ]}*/}
            {/*    currentStep={step}*/}
            {/*    onStepChange={setStep}*/}
            {/*    themeColor="emerald"*/}
            {/*>*/}
            {/*    {[*/}
            {/*        <div key="1">这里是第一步内容</div>,*/}
            {/*        <div key="2">这里是第二步内容</div>,*/}
            {/*        <div key="3">这里是第三步内容</div>,*/}
            {/*    ]}*/}
            {/*</Stepper>*/}
            <Navbar
                logo="MySite"
                logoIcon={<img src="/logo.svg" className="w-6 h-6" />}
                links={[
                    { label: "首页", href: "/" },
                    { label: "产品", href: "/products" },
                    { label: "关于我们", href: "/about" },
                ]}
                user={{ name: "张三", avatarUrl: "/avatar.png" }}
                onLogin={() => console.log("Login")}
                onLogout={() => console.log("Logout")}
            />

            <Navbar
                logo={null}
                logoIcon={null}
                links={[
                    { label: "首页", href: "/" },
                    { label: "产品", href: "/products" },
                    { label: "关于我们", href: "/about" },
                ]}
                user={null}
                onLogin={() => console.log("去登录")}
            />

            <Navbar
                logo={null}
                logoIcon={null}
                links={[
                    { label: "首页", href: "/" },
                    { label: "产品", href: "/products" },
                    { label: "关于我们", href: "/about" },
                ]}
                user={undefined}
                onLogin={undefined}
            />
            <Navbar themeColor="violet" />

            <Navbar
                user={{
                    name: "张三",
                    avatarUrl: "/avatar.png",
                    menu: [
                        { label: "个人中心", href: "/profile" },
                        { label: "设置", href: "/settings" },
                    ],
                }}
            />
            <div className="min-h-screen bg-gray-100 p-6 space-y-8 max-w-xl mx-auto">

                <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="right">
                    <div className="text-base text-neutral-700 dark:text-neutral-200">
                        这是自定义的抽屉内容区域。
                    </div>
                </Drawer>

                <Button onClick={() => setIsOpen(true)}>打开侧边栏</Button>
                <Breadcrumbs
                    items={[
                        { label: "首页", href: "/" },
                        { label: "产品", href: "/products" },
                        { label: "智能手机", href: "/products/phones", icon: <Smartphone className="w-4 h-4" /> },
                        { label: "iPhone 15 Pro" }, // 最后一个为当前页面
                    ]}
                />
                <Timeline
                    color="violet"
                    items={[
                        {
                            time: "2025-06-10 09:00",
                            title: "创建项目",
                            description: "由用户张三发起的项目创建。",
                            icon: "📦",
                        },
                        {
                            time: "2025-06-11 13:30",
                            title: "新增成员",
                            description: "已添加成员李四、王五至项目中。",
                            icon: "👥",
                        },
                        {
                            time: "2025-06-12 10:15",
                            title: "发布版本",
                            description: "发布了 v1.0.0。",
                            icon: "🚀",
                        },
                    ]}
                />
                <Chart
                    type="line"
                    data={[
                        { name: "一月", value: 400 },
                        { name: "二月", value: 600 },
                        { name: "三月", value: 800 },
                    ]}
                    color="violet"
                    strokeWidth={4}
                    showGrid
                    showTooltip
                    showLegend
                />
                <Chart
                    type="pie"
                    data={[
                        { name: "前端", value: 40 },
                        { name: "后端", value: 30 },
                        { name: "设计", value: 30 },
                    ]}
                    color={["#10b981", "#06b6d4", "#8b5cf6"]}
                />
                <Chart
                    type="line"
                    data={[
                        { name: "一月", 收入: 4000, 支出: 2400 },
                        { name: "二月", 收入: 3000, 支出: 1398 },
                        { name: "三月", 收入: 5000, 支出: 2210 },
                    ]}
                    color="auto"
                    showLegend
                />
                <DataTable columns={columns} data={pagedData} loading={false} />

                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
                <Chip color="cyan" variant="soft">状态：活跃</Chip>

                <Chip color="violet" variant="outline" icon={<i>🔖</i>}>
                    标签
                </Chip>

                <Chip color="emerald" variant="solid" onClose={() => alert("删除标签")}>
                    可删除的标签
                </Chip>
                <Skeleton height="h-5" width="w-1/3" />

                <SkeletonText lines={4} />

                <SkeletonAvatar size="w-16 h-16" />

                <SkeletonCard />
                <Spinner size="sm" color="emerald" />
                <Spinner size="md" color="violet" className="mx-2" />
                <Spinner size="lg" color="cyan" thickness="2" />

                <ProgressBar value={45} label="上传中" showValue color="violet" />

                <ProgressBar
                    value={72}
                    striped
                    animated
                    color="emerald"
                    height="h-4"
                    radius="rounded-md"
                    label
                    showValue
                />
                <Badge color="emerald" variant="solid">
                    正常状态
                </Badge>

                <Badge color="cyan" variant="soft" size="sm">
                    信息
                </Badge>

                <Badge color="violet" variant="outline" size="lg" rounded="md">
                    标签
                </Badge>
                <Avatar alt="李雷" />
                <Avatar alt="张伟" />
                <Avatar
                    src="https://i.pravatar.cc/150?img=5"
                    alt="张三"
                    size="lg"
                    shape="circle"
                    ring
                    color="emerald"
                />

                <Button onClick={() => {
                    addNotification({
                        title: "已保存",
                        message: "你的更改已保存成功。",
                        type: "success", // info | success | error | custom
                        duration: 5000,  // 可选
                    });
                }}>点击一下</Button>
                <AlertDialog
                    trigger={<button className="bg-red-500 text-white px-4 py-2 rounded">删除</button>}
                    title="确认删除？"
                    description="此操作无法撤销，您确定要删除该项目吗？"
                    confirmText="删除"
                    cancelText="取消"
                    color="red"
                    onConfirm={() => console.log("已确认删除")}
                />
                <ContextMenu
                    color="violet"
                    items={[
                        { label: "编辑", icon: <EditIcon />, onSelect: () => console.log("编辑") },
                        { label: "复制", icon: <CopyIcon />, shortcut: "⌘C", onSelect: () => {} },
                        { type: "separator" },
                        { label: "删除", icon: <TrashIcon />, onSelect: () => alert("删除！") },
                    ]}
                >
                    <div className="p-6 border rounded-xl bg-white dark:bg-neutral-900">
                        右键我看看
                    </div>
                </ContextMenu>
                <HoverCard
                    trigger={<span className="underline cursor-pointer">悬停我</span>}
                    color="cyan"
                >
                    <div className="text-sm text-white">
                        👤 用户信息：<br />
                        名称：张三<br />
                        职位：前端工程师
                    </div>
                </HoverCard>
                <Popover
                    trigger={<button className="px-4 py-2 bg-emerald-500 text-white rounded">点我</button>}
                    color="violet"
                >
                    <div className="text-white text-sm">你好，我是浮层内容 ✨</div>
                </Popover>
                {/* 输入卡片 */}
                <Card
                    title="注册表单"
                    description="请填写以下信息："
                    variant="purple"
                    footer={<Button variant="purple">提交</Button>}
                >
                    <Input
                        variant="purple"
                        placeholder="请输入邮箱"
                        icon={<Mail size={16} />}
                    />
                    <Input
                        className="mt-4"
                        variant="purple"
                        placeholder="请输入用户名"
                        icon={<Settings size={16} />}
                    />
                </Card>

                {/* Tooltip + 按钮 */}
                <div className="flex gap-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="cyan">青色按钮</Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">用于提交操作</TooltipContent>
                    </Tooltip>

                    <Button variant="green" loading>
                        加载中
                    </Button>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="purple" icon={<Info size={16} />}>
                                紫色按钮
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">带图标按钮</TooltipContent>
                    </Tooltip>
                </div>

                {/* Switch */}
                <Card title="设置" variant="cyan">
                    <div className="flex items-center gap-4">
                        <label htmlFor="dark-mode" className="text-sm">
                            启用暗黑模式
                        </label>
                        <Switch
                            id="dark-mode"
                            className="data-[state=checked]:bg-green-500 bg-gray-300 relative inline-flex h-6 w-11 rounded-full transition-colors outline-none"
                        >
                            <span className="sr-only">切换暗黑模式</span>
                            <span className="translate-x-1 data-[state=checked]:translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                        </Switch>
                    </div>
                </Card>

                {/* Dialog */}
                <Card title="对话框" variant="green">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="green">打开弹窗</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <h2 className="text-lg font-semibold mb-2">提示</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                点击关闭按钮或外部区域即可关闭此窗口。
                            </p>
                            <Button variant="green" onClick={() => alert("确定操作")}>
                                确定
                            </Button>
                        </DialogContent>
                    </Dialog>
                </Card>

                {/* Tabs */}
                <Card title="标签页" variant="cyan">
                    <Tabs defaultValue="account">
                        <TabsList>
                            <TabsTrigger value="account">账户</TabsTrigger>
                            <TabsTrigger value="settings">设置</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <p className="text-sm">这是账户标签页内容。</p>
                        </TabsContent>
                        <TabsContent value="settings">
                            <p className="text-sm">这是设置标签页内容。</p>
                        </TabsContent>
                    </Tabs>
                </Card>

                {/* Toast 触发按钮 */}
                <Button
                    variant="cyan"
                    icon={<Bell size={16} />}
                    onClick={() => setOpenToast(true)}
                >
                    显示通知
                </Button>

                {/* Toast 本体 */}
                <Toast
                    open={openToast}
                    onOpenChange={setOpenToast}
                    duration={4000}
                >
                    <ToastTitle>操作成功</ToastTitle>
                    <ToastDescription asChild>
                        <span className="text-sm text-gray-600">您的更改已保存。</span>
                    </ToastDescription>
                    <ToastAction altText="关闭">关闭</ToastAction>
                </Toast>
                <ToastViewport />
                {/* Dropdown 用法 */}
                <Dropdown trigger="更多操作">
                    <Dropdown.Item onSelect={() => console.log("编辑")}>编辑</Dropdown.Item>
                    <Dropdown.Item onSelect={() => console.log("删除")}>删除</Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item disabled>禁用项</Dropdown.Item>
                </Dropdown>

                {/* Modal 用法 */}
                <Button variant="green" onClick={() => setOpen(true)}>
                    打开模态框
                </Button>

                <Modal open={open} onOpenChange={setOpen} title="示例模态框">
                    <p className="mb-4 text-sm text-gray-600">这里是模态框内容。</p>
                    <Button variant="green" onClick={() => setOpen(false)}>
                        关闭
                    </Button>
                </Modal>

                <div className="p-4 space-y-4">
                    <h2 className="text-lg font-semibold">你喜欢哪些水果？</h2>
                    <MultiSelect
                        options={OPTIONS}
                        selected={selectedFruits}
                        onChange={setSelectedFruits}
                        placeholder="选择水果"
                    />
                    <div>已选择：{selectedFruits.join(", ")}</div>
                </div>
                <div className="p-4 space-y-4">
                    <h2 className="text-lg font-semibold">选择性别</h2>
                    <RadioGroup
                        options={RadioOPTIONS}
                        value={gender}
                        onChange={setGender}
                    />
                    <div>当前选择：{gender}</div>
                </div>
            </div>
            <div className="p-4 space-y-4">
                <h2 className="text-lg font-semibold">价格区间选择</h2>
                <RangeSlider
                    value={range}
                    onChange={setRange}
                    min={0}
                    max={100}
                    step={5}
                />
                <div>当前区间：{range[0]} - {range[1]}</div>
            </div>
            <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">音量调节</h2>
                <Slider value={volume} onChange={setVolume} min={0} max={100} step={1} />
                <p>当前音量：{volume}%</p>
            </div>
            <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">留言</h2>
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="请输入您的留言..."
                />
                <p className="text-sm text-gray-500">字符数：{content.length}</p>
            </div>
            <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">请选择语言</h2>
                <Select
                    options={SelectOPTIONS}
                    value={language}
                    onChange={setLanguage}
                    placeholder="选择一种语言"
                />
                <p>你选择的是：{language || "未选择"}</p>
            </div>
            <FileUpload onChange={(files) => console.log(files)} />
            <Combobox
                options={[{ label: "Apple", value: "apple" }, { label: "Banana", value: "banana" }]}
                value={selected}
                onChange={setSelected}
            />
            <Autocomplete
                options={[{ label: "Vue.js", value: "vue" }, { label: "React", value: "react" }]}
                value={tech}
                onChange={setTech}
            />
            <div className="p-6 space-y-6">
                <DatePicker value={date} onChange={setDate} />
                <DateRangePicker value={dateRange} onChange={setDateRange} />
                <TimePicker value={time} onChange={setTime} />
                <TimeRangePicker value={timeRange} onChange={setTimeRange} />
            </div>
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-xl font-bold mb-4">拖拽 Block 编辑器</h1>
                <BlockEditor />
            </div>
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-xl font-bold mb-4">多选拖拽 Block 编辑器</h1>
                <BlockEditorMultiSelect />
            </div>
            <div className="min-h-screen bg-gray-50 p-6">
                <h1 className="text-2xl font-bold mb-6">浮动面板（基于 dnd-kit）</h1>
                <p className="mb-8 text-gray-600">
                    你可以拖动下方面板，且不会触发 React 警告。
                </p>

                <FloatingPanelDnd title="工具栏">
                    <div className="space-x-2">
                        <button className="px-2 py-1 text-xs border rounded">B</button>
                        <button className="px-2 py-1 text-xs border rounded">I</button>
                        <button className="px-2 py-1 text-xs border rounded">U</button>
                    </div>
                </FloatingPanelDnd>
            </div>
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">嵌套文档结构编辑器</h1>
                <NestedOutlineEditor items={items} onChange={setItems} />
            </div>
            <ComponentInsertEditor/>
        </ToastProvider>
    );
}

export default App;
