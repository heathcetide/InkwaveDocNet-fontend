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

import { ComponentInsertEditor } from "./components/ComponentInsertEditor";

import {
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
} from "./components/Toast";
import { Mail, Settings, Info, Bell } from "lucide-react";
import { Select } from "./components/Select";
import {Autocomplete} from "./components/Autocomplete";
import {Combobox} from "./components/Combobox";
import {FileUpload} from "./components/FileUpload";
import {TimeRangePicker} from "./components/TimeRangePicker";
import {TimePicker} from "./components/TimePicker";
import {DateRangePicker} from "./components/DateRangePicker";
import {DatePicker} from "./components/DatePicker";
import { nanoid } from "nanoid";

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


function App() {
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

    return (
        <ToastProvider swipeDirection="right">
            <div className="min-h-screen bg-gray-100 p-6 space-y-8 max-w-xl mx-auto">
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
